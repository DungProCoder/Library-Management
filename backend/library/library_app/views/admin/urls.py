from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .book import BookListCreateView, BookRetrieveUpdateDestroyView
from .borrow import BorrowBookView, ReturnBookView
from .category import CategoryListCreateView, CategoryDetailView

urlpatterns = [
    # Category URLs
    path('categories/', CategoryListCreateView.as_view(), name='category_list_create'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category_detail'),

    # Book URLs
    path('books/', BookListCreateView.as_view(), name='book_list_create'),
    path('books/<int:pk>/', BookRetrieveUpdateDestroyView.as_view(), name='book_detail'),

    # Borrow URLs
    path('borrow/', BorrowBookView.as_view(), name='borrow_book'),
    path('return/<int:pk>/', ReturnBookView.as_view(), name='return_book'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)