from django.apps import AppConfig


class GymPlanConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "gym_plan"

    def ready(self):
        from gym_plan import payment_updater
        payment_updater.start()

