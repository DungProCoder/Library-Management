from django.urls import path
from . import views

urlpatterns = [
    path('books/', views.BookListCreateView.as_view(), name='book_list_create'),
    path('books/<int:pk>/', views.BookRetrieveUpdateDestroyView.as_view(), name='book_detail'),
    path('borrow/', views.BorrowBookView.as_view(), name='borrow_book'),
    path('return/<int:pk>/', views.ReturnBookView.as_view(), name='return_book'),
]