from rest_framework import generics, permissions
from ...serializers import BookSerializer
from ...models import Book

class BookListView(generics.ListAPIView):
    queryset = Book.objects.all()[:16]
    serializer_class = BookSerializer
    permission_classes = [permissions.AllowAny]

class BookDetailView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'isbn'