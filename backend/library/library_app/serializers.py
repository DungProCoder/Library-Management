from rest_framework import serializers
from .models import Book, BookSeries, Favorite, BorrowRequest, BorrowRecord, BookRecordItem, Category, Rating, FAQ
from users.serializers import UserSerializer
from django.utils import timezone
from datetime import timedelta

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']
        read_only_fields = ['slug']

class BookSeriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookSeries
        fields = "__all__"

class BookSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source="category",
        write_only=True
    )
    series = BookSeriesSerializer(read_only=True)
    series_id = serializers.PrimaryKeyRelatedField(
        queryset=BookSeries.objects.all(),
        source="series",
        write_only=True,
        allow_null=True,
        required=False,
    )
    avg_rating = serializers.FloatField(read_only=True)
    count_rating = serializers.IntegerField(read_only=True)
    is_favorite = serializers.BooleanField(read_only=True)

    class Meta:
        model = Book
        fields = [
            'id', 'title', 'author', 'isbn', 'description',
            'quantity', 'category', 'category_id', 'image',
            'avg_rating', 'count_rating', 'series', 'series_id',
            'volume_number', 'is_favorite'
        ]
        read_only_fields = ['isbn']

class FavoriteSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    book_id = serializers.PrimaryKeyRelatedField(
        queryset=Book.objects.all(), source="book", write_only=True
    )

    class Meta:
        model = Favorite
        fields = ['id', 'book', 'book_id', 'date_add']
        read_only_fields = ['date_add']
    
    def validate(self, attrs):
        request = self.context["request"]
        user = request.user
        book = attrs["book"]

        # Kiểm tra trùng sách trong giỏ
        if Favorite.objects.filter(user=user, book=book).exists():
            raise serializers.ValidationError({
                "book": "Sách này bạn đã được thêm vào danh sách yêu thích."
            })

        return attrs
    
    def create(self, validated_data):
        user = self.context["request"].user
        return Favorite.objects.create(user=user, **validated_data)

class BorrowRequestSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    book_id = serializers.PrimaryKeyRelatedField(
        queryset=Book.objects.all(), source="book", write_only=True
    )

    class Meta:
        model = BorrowRequest
        fields = ['id', 'book', 'book_id', 'expected_days', 'date_add']
        read_only_fields = ['date_add']
    
    def validate(self, attrs):
        request = self.context["request"]
        user = request.user
        book = attrs["book"]

        # Kiểm tra trùng sách trong giỏ
        if BorrowRequest.objects.filter(user=user, book=book).exists():
            raise serializers.ValidationError({
                "book": "Sách này bạn đã yêu cầu mượn. Hãy kiểm tra lại danh sách đăng ký mượn nhé."
            })
    
        # Kiểm tra tổng số sách trong giỏ (tối đa 3)
        count = BorrowRequest.objects.filter(user=user).count()
        if count >= 3:
            raise serializers.ValidationError({
                "limit": "Bạn chỉ được phép mượn tối đa 3 quyển trong một lần."
            })

        return attrs

class BookRecordItemSerializer(serializers.ModelSerializer):
    book_title = serializers.CharField(source="book.title", read_only=True)
    book_image = serializers.ImageField(source="book.image", read_only=True)

    class Meta:
        model = BookRecordItem
        fields = ['id', 'book_title', 'book_image', 'quantity']
        read_only_fields = fields

class BorrowRecordSerializer(serializers.ModelSerializer):
    items = BookRecordItemSerializer(many=True, read_only=True)

    class Meta:
        model = BorrowRecord
        fields = [
            "id", "user", "first_name", "last_name", "address", "phone",
            "location", "borrow_date", "return_date", "due_date", "status", "items"
        ]
        read_only_fields = ["user", "borrow_date", "items"]

    def create(self, validated_data):
        user = self.context["request"].user

        # Lấy toàn bộ giỏ BorrowRequest để tạo record
        borrow_requests = BorrowRequest.objects.filter(user=user)
        if not borrow_requests.exists():
            raise serializers.ValidationError("Giỏ mượn của bạn đang trống.")

        # Lấy số ngày mượn từ request đầu tiên (hoặc max/min tùy quy tắc)
        expected_days = borrow_requests.first().expected_days
        
        borrow_record = BorrowRecord.objects.create(
            user=user,
            due_date=timezone.now() + timedelta(days=expected_days),
            **validated_data
        )

        for req in borrow_requests:
            BookRecordItem.objects.create(
                borrow_record=borrow_record,
                book=req.book,
                quantity=1
            )
            # Trừ số lượng sách còn lại
            req.book.quantity -= 1
            req.book.save()

        # Xóa giỏ sau khi đã chuyển thành record
        borrow_requests.delete()

        return borrow_record

class RatingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    book_id = serializers.IntegerField(source="book.id", read_only=True)

    class Meta:
        model = Rating
        fields = ['id', 'user', 'user_id', 'book_id', 'rate', 'comment', 'date_add']

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['id', 'question', 'answer', 'keywords']