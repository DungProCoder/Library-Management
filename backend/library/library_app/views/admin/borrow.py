from rest_framework import generics, permissions, status
from rest_framework.response import Response
from ...serializers import BorrowRecordSerializer
from ...models import Book, BorrowRecord
from ...permissions import IsAdminUser
from django.utils import timezone

class BorrowBookView(generics.CreateAPIView):
    serializer_class = BorrowRecordSerializer
    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        book_id = request.data.get('book_id')

        try:
            book = Book.objects.get(id=book_id)
        except:
            return Response({"message": "Sách không tồn tại"}, status=status.HTTP_404_NOT_FOUND)
        
        if book.quantity <= 0:
            return Response({"message": "Hết sách"}, status=status.HTTP_400_BAD_REQUEST)
        
        BorrowRecord.objects.create(
            user=request.user,
            book=book,
        )

        book.quantity -= 1
        book.save()

        return Response({"message": "Mượn sách thành công"}, status=status.HTTP_200_OK)
    
class ReturnBookView(generics.UpdateAPIView):
    queryset = BorrowRecord.objects.all()
    serializer_class = BorrowRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        borrow = self.get_object()

        if borrow.status == 'returned':
            return Response({"message": "Sách đã được trả"}, status=status.HTTP_400_BAD_REQUEST)
        
        borrow.status = 'returned'
        borrow.return_date = timezone.now()
        borrow.save()

        book = borrow.book
        book.quantity += 1
        book.save()

        return Response({"message": "Trả sách thành công"}, status=status.HTTP_200_OK)