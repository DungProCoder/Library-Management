from rest_framework import generics, permissions
from ...serializers import BookSerializer
from ...models import Book

class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    # permission_classes = [permissions.AllowAny]

    # def perform_create(self, serializer):
    #     if self.request.user.role != 'admin':
    #         raise PermissionError("Bạn không có quyền thêm sách")
    #     serializer.save()

class BookRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    # permission_classes = [permissions.IsAuthenticated]