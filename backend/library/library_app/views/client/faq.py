from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions
from ...models import Book, FAQ
from ...serializers import FAQSerializer
from rapidfuzz import fuzz

class ChatAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        message = request.data.get('message', '').lower()

        if not message:
            return Response({"reply": "Bạn chưa nhập nội dung"}, status=400)
        
        faqs = FAQ.objects.all()

        # 1. Tìm kiếm theo keywords trước
        best_match = None
        best_score = 0
        for faq in faqs:
            if faq.keywords:
                keywords = [k.strip().lower() for k in faq.keywords]
                score = sum(1 for kw in keywords if kw in message)
                if score > best_score:
                    best_match = faq
                    best_score = score
        
        if best_match and best_score > 0:
            return Response({"reply": best_match.answer})
        
        # 2. Nếu không khớp keywords → dùng fuzzy search
        best_match = None
        best_score = 0
        for faq in faqs:
            score = fuzz.partial_ratio(message, faq.question.lower())
            if score > best_score:
                best_match = faq
                best_score = score
        
        if best_match and best_score > 60:  # ngưỡng độ giống nhau
            return Response({"reply": best_match.answer})
        
        # 3. Nếu vẫn không khớp → gợi ý sách
        suggested_books = Book.objects.filter(title__icontains=message).first()

        if suggested_books:
            return Response({"reply": f"Xin lỗi, tôi không tìm thấy câu trả lời. Tuy nhiên, bạn có thể quan tâm đến cuốn sách '{suggested_books.title}'."})
        
        return Response({"reply": "Xin lỗi, tôi không tìm thấy câu trả lời cho câu hỏi của bạn."})

class FAQCreateAPIView(generics.CreateAPIView):
    queryset = FAQ.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = FAQSerializer