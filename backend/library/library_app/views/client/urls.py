from django.urls import path
from .book import BookListCreateView, BookRetrieveUpdateDestroyView
urlpatterns = [
    path('books/', BookListCreateView.as_view(), name='book_list_create'),
    path('books/<int:pk>/', BookRetrieveUpdateDestroyView.as_view(), name='book_detail'),
]