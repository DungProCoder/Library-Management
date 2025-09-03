from django.urls import path
from .book import BookListView
from .category import CategoryListView
from .rating import RatingBookView, UserBookRatingView

urlpatterns = [
    # books
    path('books/', BookListView.as_view(), name='book_list_create'),
    path('books/<str:isbn>/', BookListView.as_view(), name='book_detail'),

    # categories
    path('categories/', CategoryListView.as_view(), name='category_list_create'),

    # borrow
    path('borrow/', BookListView.as_view(), name='borrow_book'),

    # Rating
    path('rating/', RatingBookView.as_view(), name='rating_book'),
    path('books/<int:pk>/rating/', UserBookRatingView.as_view(), name='rating_book'),
]