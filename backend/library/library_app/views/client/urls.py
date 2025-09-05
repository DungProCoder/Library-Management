from django.urls import path
from .book import BookListView, BookDetailView, BookListAtCategoryView
from .category import CategoryListView
from .rating import RatingBookView, RatingListView, UserBookRatingView

urlpatterns = [
    # categories
    path('categories/', CategoryListView.as_view(), name='category_list_create'),

    # books
    path('books/', BookListAtCategoryView.as_view(), name='book_list_at_category'),
    path('books/home/', BookListView.as_view(), name='book_list'),
    path('books/<str:isbn>/', BookDetailView.as_view(), name='book_detail'),

    # borrow
    path('borrow/', BookListView.as_view(), name='borrow_book'),

    # Rating
    path('rating/', RatingBookView.as_view(), name='rating_book'),
    path('books/<str:isbn>/rating/', RatingListView.as_view(), name='rating_list'),
    path('user/books/<int:pk>/rated/', UserBookRatingView.as_view(), name='user_rated_book'),
]