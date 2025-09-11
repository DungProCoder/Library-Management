from celery import shared_task
from django.utils.timezone import now
from django.core.mail import send_mail
from django.conf import settings
from .models import BorrowRecord
import datetime

@shared_task
def send_overdue_emails():
    today = now().date()
    overdue_records = BorrowRecord.objects.filter(
        returned=False,
        due_date__lt=today
    )

    for record in overdue_records:
        subject = "📚 Thông báo quá hạn sách"
        message = (
            f"Xin chào {record.user.username},\n\n"
            f"Bạn đã mượn quyển sách '{record.book.title}' và đã quá hạn từ ngày {record.due_date}.\n"
            f"Vui lòng liên hệ thư viện để gia hạn hoặc trả sách.\n\n"
            f"Trân trọng."
        )
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [record.user.email],
            fail_silently=False,
        )