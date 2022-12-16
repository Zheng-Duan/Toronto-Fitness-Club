from django.db import models
from studios.models import Studio
from django.core.validators import MinValueValidator, MaxValueValidator
import datetime
from accounts.models.GeneralUser import GeneralUser


# Create your models here.

class Lesson(models.Model):
    """
    lesson
    A class has a name, description, coach, a list of keywords
    (e.g., upper-body, core, etc.), capacity, and times.
    Times indicate the recurring instances of the class. For example, a HIIT
    session is held on Mondays from 8:00-9:00am.
    """
    studio = models.ForeignKey(Studio, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    description = models.TextField()
    coach = models.CharField(max_length=128)
    capacity = models.IntegerField(validators=[MinValueValidator(1)])
    keywords = models.CharField(max_length=255,
                                help_text="blank space to split the words",
                                default="")
    create_at = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name = "Classes"
        ordering = ('-create_at', )

    @property
    def times(self):
        return LessonTimes.objects.filter(lesson=self)

    def __str__(self) -> str:
        return str(self.studio) + '-' + self.name


class LessonTimes(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    start_hour = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(23)])
    start_min = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(60)])
    end_hour = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(23)])
    end_min = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(60)])
    weekday = models.CharField(max_length=10,
                               choices=[('0', 'Monday'), ('1', 'Tuesday'),
                                        ('2', 'Wednesday'),
                                        ('3', 'Thursday'), ('4', 'Friday'),
                                        ('5', 'Saturday'),
                                        ('6', 'Sunday')])

    @property
    def schedules(self):
        return LessonTimeSchedule.objects.filter(time=self).filter(
            date__gt=datetime.datetime.now().date())

    class Meta:
        ordering = (
            '-weekday', 'start_hour', 'start_min', 'end_hour', 'end_min')

    def __str__(self) -> str:
        return str(
            self.lesson) + '-' + f'{self.start_hour}:{self.start_min} {self.end_hour}:{self.end_min} on {self.weekday[0]}'


class LessonTimeSchedule(models.Model):
    time = models.ForeignKey(LessonTimes, on_delete=models.CASCADE)
    status = models.CharField(max_length=10,
                              choices=[('0', 'canceled'), ('1', 'normal')],
                              default=1)
    date = models.DateField(verbose_name='class date')

    class Meta:
        ordering = ('date',)

    def __str__(self) -> str:
        return str(self.time) + '-' + self.status + '-' + str(self.date)


class UserEnroll(models.Model):
    user = models.ForeignKey(GeneralUser, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now_add=True)
    has_all_times = models.CharField(max_length=10,
                                     choices=[('0', 'no'), ('1', 'yes')],
                                     default='0')

    @property
    def if_has_all_times(self):
        return self.has_all_times == '1'

    def __str__(self) -> str:
        return str(self.user) + '-' + str(self.lesson)


class UserSchedule(models.Model):
    enroll = models.ForeignKey(UserEnroll, on_delete=models.CASCADE)
    schedule = models.ForeignKey(LessonTimeSchedule, on_delete=models.CASCADE)
    status = models.CharField(max_length=10,
                              choices=[('0', 'canceled'), ('1', 'normal')],
                              default='1')


from django.db.models.signals import post_save
from django.db.transaction import atomic
from django.dispatch import receiver


@atomic
@receiver(post_save, sender=LessonTimes)
def generate_lesson_schedule(sender, instance, created, **kwargs):
    """
    """
    time = instance
    LessonTimeSchedule.objects.filter(time=time).update(status='0')

    status = '1'
    now = datetime.datetime.now()
    days = 365
    index = 1
    while index <= days:
        _date = now + datetime.timedelta(days=index)
        _weekday = _date.weekday()
        _weekday = str(_weekday)
        if time.weekday == _weekday:
            schedule = LessonTimeSchedule(time=time, status=status, date=_date)
            schedule.save()
        index += 1


@atomic
@receiver(post_save, sender=UserEnroll)
def generate_user_lesson_schedule(sender, instance, created, **kwargs):
    enroll = instance
    if created:
        if enroll.has_all_times:
            schedules = LessonTimeSchedule.objects.filter(
                time__lesson=enroll.lesson)
            for schedule in schedules:
                user_schedule = UserSchedule(enroll=enroll, schedule=schedule)
                user_schedule.save()
