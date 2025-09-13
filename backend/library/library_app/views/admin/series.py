from rest_framework import generics
from ...models import BookSeries
from ...serializers import BookSeriesSerializer
from ...permissions import IsAdminUser

class BookSeriesListCreateView(generics.ListCreateAPIView):
    queryset = BookSeries.objects.all()
    serializer_class = BookSeriesSerializer
    permission_classes = [IsAdminUser]

class BookSeriesDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BookSeries.objects.all()
    serializer_class = BookSeriesSerializer
    permission_classes = [IsAdminUser]