from rest_framework import serializers
from .models import Book, BorrowRecord

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = BorrowRecord
        fields = '__all__'

class BorrowRecordSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    book = serializers.StringRelatedField()

    class Meta:
        model = BorrowRecord
        fields = '__all__'