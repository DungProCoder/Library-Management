from rest_framework import generics, permissions, status
from ...serializers import BorrowRequestSerializer, BorrowRecordSerializer
from ...models import BorrowRequest, BorrowRecord
from rest_framework.response import Response

# Lấy danh sách + thêm mới sách vào giỏ
class BorrowRequestListCreateView(generics.ListCreateAPIView):
    serializer_class = BorrowRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return BorrowRequest.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# Xoá 1 sách trong giỏ
class BorrowRequestDeleteView(generics.DestroyAPIView):
    serializer_class = BorrowRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return BorrowRequest.objects.filter(user=self.request.user)

# Lấy danh sách mượn sách trong giỏ
class BorrowRecordCreateView(generics.ListCreateAPIView):
    serializer_class = BorrowRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return BorrowRecord.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save()

# Trả sách
class ReturnBookView(generics.UpdateAPIView):
    queryset = BorrowRecord.objects.all()
    serializer_class = BorrowRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.user != request.user:
            return Response({"detail": "Bạn không có quyền trả đơn mượn này."}, status=status.HTTP_403_FORBIDDEN)

        if instance.status != "borrowing":
            return Response({"detail": "Trạng thái không hợp lệ để trả sách."}, status=status.HTTP_400_BAD_REQUEST)

        instance.status = "pending_return"
        instance.save()
        return Response({"detail": "Yêu cầu trả sách đã được gửi, chờ admin xác nhận."}, status=status.HTTP_200_OK)

class CheckActiveBorrowView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        active_record = BorrowRecord.objects.filter(
            user=user
        ).exclude(status="returned").first()

        if active_record:
            return Response({
                "canBorrow": False,
                "message": "Bạn đang có đơn mượn chưa hoàn trả lại sách. Hãy trả đơn mượn để có tiếp tục mượn sách!",
                "record_id": active_record.id,
                "status": active_record.status
            })

        return Response({
            "canBorrow": True,
            "message": "Bạn có thể mượn sách."
        })