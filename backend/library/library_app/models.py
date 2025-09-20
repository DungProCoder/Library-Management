from django.db import models
from django.utils.text import slugify
import random
from users.models import User

class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)

    def save(self, *args, **kwargs):
        # luôn cập nhật slug từ name
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class BookSeries(models.Model):
    title = models.CharField(max_length=255)
    date_add = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Book(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='books/covers/', null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    author = models.CharField(max_length=255)
    isbn = models.CharField(max_length=13, unique=True)
    quantity = models.IntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
    series = models.ForeignKey(BookSeries, on_delete=models.CASCADE, null=True, blank=True, related_name='books')
    volume_number = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.isbn:
            while True:
                isbn = ''.join([str(random.randint(0, 9)) for _ in range(13)])
                if not Book.objects.filter(isbn=isbn).exists():
                    self.isbn = isbn
                    break
        super().save(*args, **kwargs)
    
    @property
    def avg_rating(self):
        ratings = self.ratings.all()
        if ratings.exists():
            return round(sum([r.rate for r in ratings]) / ratings.count(), 1)
        return 0
    
    @property
    def count_rating(self):
        return self.ratings.count()

class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="favorites")
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="favorited_by")
    date_add = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'book')  # mỗi user chỉ được favorite 1 lần / sách

    def __str__(self):
        return f"{self.user.username} - {self.book.title}"
    
class BorrowRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    expected_days = models.PositiveIntegerField(default=14)
    date_add = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'book')

    def __str__(self):
        return f"{self.user.username} - {self.book.title}"


class BorrowRecord(models.Model):
    STATUS_CHOICES = (
        ('borrowing', 'Borrowing'),
        ('pending_return', 'Pending Return'),
        ('returned', 'Returned'),
        ('overdue', 'Overdue'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    borrow_date = models.DateTimeField(auto_now_add=True)
    return_date = models.DateTimeField(null=True, blank=True)
    due_date = models.DateTimeField(null=True, blank=True)
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    location = models.CharField(max_length=15, null=True, blank=True)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='borrowing')

    def __str__(self):
        return f"{self.user.username} - {self.book.title}"
    
class BookRecordItem(models.Model):
    borrow_record = models.ForeignKey(BorrowRecord, on_delete=models.CASCADE, related_name='items')
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.book.title} ({self.quantity})"

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="ratings")
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="ratings")
    rate = models.IntegerField(default=0)  # giá trị 1-5 sao
    comment = models.TextField(null=True, blank=True)
    date_add = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'book')  # mỗi user chỉ được rate 1 lần / sách

    def __str__(self):
        return f"{self.user.username} - {self.book.title} ({self.rate})"
    
class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    keywords = models.TextField(null=True, blank=True, help_text="Nhập nhiều từ khóa, cách nhau bởi dấu phẩy")  # từ khóa tìm kiếm

    def __str__(self):
        return self.question
