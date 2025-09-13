from django.urls import path
from .book import BookListCreateView, BookRetrieveUpdateDestroyView
from .borrow import BorrowRecordListView, ReturnBookView, OverdueEmailView
from .category import CategoryListCreateView, CategoryDetailView
from .series import BookSeriesListCreateView, BookSeriesDetailView

urlpatterns = [
    # Category URLs
    path('categories/', CategoryListCreateView.as_view(), name='category_list_create'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category_detail'),

    # Series URLs
    path("book-series/", BookSeriesListCreateView.as_view(), name="series_list_create"),
    path("book-series/<int:pk>/", BookSeriesDetailView.as_view(), name="series_detail"),

    # Book URLs
    path('books/', BookListCreateView.as_view(), name='book_list_create'),
    path('books/<int:pk>/', BookRetrieveUpdateDestroyView.as_view(), name='book_detail'),

    # Borrow URLs
    path('borrow/', BorrowRecordListView.as_view(), name='borrow_book_list'),
    path('return/<int:pk>/', ReturnBookView.as_view(), name='return_book'),
    path("send-overdue-emails/", OverdueEmailView.as_view(), name="send-overdue-emails"),
]