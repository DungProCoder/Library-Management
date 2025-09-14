from django.db.models import Avg
from django.db.models import OuterRef, Exists, Value, BooleanField
from rest_framework import generics, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
from ...serializers import BookSerializer
from ...models import Book, Favorite
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

    def get_queryset(self):
        qs = Book.objects.all()
        user = self.request.user
        if user.is_authenticated:
            fav_qs = Favorite.objects.filter(user=user, book=OuterRef('pk'))
            qs = qs.annotate(is_favorite=Exists(fav_qs))
        else:
            qs = qs.annotate(is_favorite=Value(False, output_field=BooleanField()))
        return qs

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

class BookSearchView(generics.ListAPIView):
    serializer_class = BookSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'author']
    ordering_fields = ['avg_rating_db']
    ordering = ['avg_rating_db']

    def get_queryset(self):
        qs = Book.objects.all().annotate(avg_rating_db=Avg('ratings__rate'))
        return qs