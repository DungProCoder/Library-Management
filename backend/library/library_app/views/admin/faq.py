from rest_framework import generics, permissions
from ...models import FAQ
from ...serializers import FAQSerializer
from ...permissions import IsAdminUser

class FAQListCreateAPIView(generics.ListCreateAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    permission_classes = [IsAdminUser]

class FAQUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    permission_classes = [IsAdminUser]