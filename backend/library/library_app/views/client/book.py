from django.db.models import Avg
from rest_framework import generics, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
from ...serializers import BookSerializer
from ...models import Book
from ...pagination import StandardResultsSetPagination

class BookListView(generics.ListAPIView):
    queryset = Book.objects.all()[:16]
    serializer_class = BookSerializer
    permission_classes = [permissions.AllowAny]

class BookDetailView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'isbn'

class BookListAtCategoryView(generics.ListAPIView):
    serializer_class = BookSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category']
    ordering_fields = ['title', 'avg_rating_db']
    ordering = ['title']

    def get_queryset(self):
        qs = Book.objects.all().annotate(avg_rating_db=Avg('ratings__rate'))
        return qs