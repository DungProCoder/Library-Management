from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from ...serializers import BorrowRecordSerializer
from ...models import BorrowRecord
from ...permissions import IsAdminUser
from ...tasks import send_overdue_emails
from django.utils.timezone import localtime
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone

class BorrowRecordListView(generics.ListAPIView):
    queryset = BorrowRecord.objects.all().order_by("-borrow_date")
    serializer_class = BorrowRecordSerializer
    permission_classes = [IsAdminUser]
    
class ReturnBookView(generics.UpdateAPIView):
    queryset = BorrowRecord.objects.all()
    serializer_class = BorrowRecordSerializer
    permission_classes = [IsAdminUser]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.status != "pending_return":
            return Response({"detail": "Chỉ xác nhận được đơn đang chờ trả."}, status=status.HTTP_400_BAD_REQUEST)

        instance.status = "returned"
        instance.return_date = timezone.now()

        # Cộng lại số lượng sách
        for item in instance.items.all():
            item.book.quantity += item.quantity
            item.book.save()

        instance.save()
        
        # Gửi mail cho người dùng
        subject = "Xác nhận trả sách thành công"
        message = (
            f"Xin chào {instance.first_name} {instance.last_name},\n\n"
            f"Thư viện xác nhận bạn đã trả thành công đơn mượn #{instance.id}.\n"
            f"Ngày trả: {localtime(instance.return_date).strftime('%d/%m/%Y %H:%M')}\n\n"
            "Cảm ơn bạn đã sử dụng dịch vụ của thư viện!"
        )
        recipient = instance.user.email

        try:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [recipient],
                fail_silently=False,
            )
        except Exception as e:
            print("Gửi email thất bại:", e)

        return Response(
            {"detail": "Xác nhận trả sách thành công và đã gửi email cho người dùng."},
            status=status.HTTP_200_OK
        )

class OverdueEmailView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        send_overdue_emails.delay()
        return Response({"message": "Emails đã được gửi cho các user quá hạn."})