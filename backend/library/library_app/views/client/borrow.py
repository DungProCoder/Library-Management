from rest_framework import generics, permissions
from ...serializers import BorrowRequestSerializer, BorrowRecordSerializer
from ...models import BorrowRequest, BorrowRecord

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
    
class BorrowRecordCreateView(generics.ListCreateAPIView):
    serializer_class = BorrowRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return BorrowRecord.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save()