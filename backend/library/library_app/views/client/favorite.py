from rest_framework import generics, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ...models import Favorite, Book
from ...serializers import FavoriteSerializer

class FavoriteListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FavoriteSerializer

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user).select_related("book")

class BookFavoriteToggleAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        book = get_object_or_404(Book, pk=pk)
        fav, created = Favorite.objects.get_or_create(user=request.user, book=book)
        if created:
            return Response({"favorited": True, "favorite_id": fav.id}, status=status.HTTP_201_CREATED)
        else:
            fav.delete()
            return Response({"favorited": False}, status=status.HTTP_200_OK)
