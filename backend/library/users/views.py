from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .permissions import IsAdminUser
from .serializers import RegisterSerializer, UserSerializer
from .models import User

# Client
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user, context={'request': request})
        return Response(serializer.data)

class UserRetrieveUpdateDestroyViewForUser(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
# Admin
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

class UserRetrieveUpdateDestroyViewForAdmin(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

class BlockUserView(APIView):
    permission_classes = [IsAdminUser]

    def put(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Toggle trạng thái
        user.is_active = not user.is_active
        user.save()

        # Soạn nội dung mail
        subject = "Thông báo tài khoản"
        if user.is_active:
            message = f"Xin chào {user.username},\n\nTài khoản của bạn đã được mở khóa. Bạn có thể đăng nhập lại."
        else:
            message = (
                f"Xin chào {user.username},\n\n"
                "Tài khoản của bạn đã bị khóa bởi quản trị viên.\n"
                "Vui lòng liên hệ hỗ trợ.\nHotline: 0123 456 789"
            )
        
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False
        )

        return Response({"message": "Thành công"}, status=status.HTTP_200_OK)

# Me at authorize
class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_superuser": user.is_superuser,
            "role": "admin" if user.is_staff else "user",
            "avatar": user.avatar.url if hasattr(user, "avatar") and user.avatar else None
        })
