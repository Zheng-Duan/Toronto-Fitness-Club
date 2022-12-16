from apscheduler.schedulers.background import BackgroundScheduler
from gym_plan.views.payment_view import PaymentView


def start():
    scheduler = BackgroundScheduler()
    payment = PaymentView()
    scheduler.add_job(payment.make_new_payment, "interval", seconds=60,
                      id="payment_001", replace_existing=True)
    scheduler.start()


