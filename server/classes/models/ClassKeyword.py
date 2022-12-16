from django.db import models


class Keywords(models.Model):
    objects = models.Manager()
    keyword = models.CharField(max_length=200, blank=False, null=False)

    def __str__(self):
        return self.keyword