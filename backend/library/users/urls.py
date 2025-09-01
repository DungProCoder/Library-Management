from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # Client
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('profile/', views.UserProfileView.as_view(), name='user_profile'),

    # Admin
    path('list/', views.UserListView.as_view(), name='user_list'),
    path('edit/<int:pk>/', views.UserRetrieveUpdateDestroyView.as_view(), name='user_edit'),
    path('block/<int:pk>/', views.BlockUserView.as_view(), name='block_user'),

    # Me
    path('me/', views.MeView.as_view(), name='me'),
]