from django.db.models import Avg
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters, permissions
from ...models import Book
from ...serializers import BookSerializer
from ...pagination import StandardResultsSetPagination

class BooksWithSeriesListView(generics.ListAPIView):
    serializer_class = BookSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'author']
    ordering_fields = ['avg_rating_db']
    ordering = ['avg_rating_db']

    def get_queryset(self):
        qs = Book.objects.filter(series__isnull=False).annotate(
            avg_rating_db=Avg('ratings__rate')
        )
        return qs