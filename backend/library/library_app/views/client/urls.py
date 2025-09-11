from django.urls import path
from .book import BookListView, BookDetailView, BookListAtCategoryView
from .category import CategoryListView
from .borrow import BorrowRequestListCreateView, BorrowRequestDeleteView, BorrowRecordCreateView, ReturnBookView, CheckActiveBorrowView
from .rating import RatingBookView, RatingListView, UserBookRatingView

urlpatterns = [
    # categories
    path('categories/', CategoryListView.as_view(), name='category_list_create'),

    # books
    path('books/', BookListAtCategoryView.as_view(), name='book_list_at_category'),
    path('books/home/', BookListView.as_view(), name='book_list'),
    path('books/<str:isbn>/', BookDetailView.as_view(), name='book_detail'),

    # borrow-request
    path('borrow-requests/', BorrowRequestListCreateView.as_view(), name='borrow_request_list_create'),
    path('borrow-requests/<int:pk>/', BorrowRequestDeleteView.as_view(), name='borrow_request_delete'),

    # borrow-record
    path('borrow-records/', BorrowRecordCreateView.as_view(), name='borrow_record_create'),
    path("borrow-records/<int:pk>/return/", ReturnBookView.as_view(), name="return-book"),
    path("borrow-records/check-active/", CheckActiveBorrowView.as_view(), name="check-active-borrow"),

    # Rating
    path('rating/', RatingBookView.as_view(), name='rating_book'),
    path('books/<str:isbn>/rating/', RatingListView.as_view(), name='rating_list'),
    path('user/books/<int:pk>/rated/', UserBookRatingView.as_view(), name='user_rated_book'),
]