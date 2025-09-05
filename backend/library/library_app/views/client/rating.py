from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from ...serializers import RatingSerializer
from ...models import Rating

class RatingBookView(generics.CreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserBookRatingView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        try:
            rating = Rating.objects.get(book_id=pk, user=request.user)
            serializer = RatingSerializer(rating)
            return Response(serializer.data)
        except Rating.DoesNotExist:
            return Response({"detail": "Chưa có đánh giá"}, status=404)

class RatingListView(generics.ListAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        is_bn = self.kwargs.get('isbn')
        return Rating.objects.filter(book__isbn=is_bn).order_by('-date_add')