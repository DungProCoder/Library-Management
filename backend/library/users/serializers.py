from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'password2', 'email', 'role']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        
        return user
    
class UserSerializer(serializers.ModelSerializer):
    current_password = serializers.CharField(write_only=True, required=False)
    new_password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = [
            'id', 'avatar', 'username', 'first_name', 'last_name',
            'phone', 'email', 'role', 'is_active',
            'current_password', 'new_password', 'confirm_password'
        ]
        extra_kwargs = {
            'username': {'read_only': True},
        }

    def validate(self, attrs):
        # Nếu có nhập new_password thì phải check confirm
        if attrs.get("new_password"):
            if attrs["new_password"] != attrs.get("confirm_password"):
                raise serializers.ValidationError(
                    {"confirm_password": "Mật khẩu xác nhận không khớp"}
                )
        return attrs

    def update(self, instance, validated_data):
        # Xóa field tạm ra khỏi validated_data trước khi update info
        new_password = validated_data.pop("new_password", None)
        confirm_password = validated_data.pop("confirm_password", None)
        current_password = validated_data.pop("current_password", None)

        # Update các field khác
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # Nếu có yêu cầu đổi mật khẩu
        if new_password:
            user = self.context['request'].user
            if not user.is_superuser:  # nếu là user thường thì bắt buộc check mật khẩu cũ
                if not user.check_password(current_password):
                    raise serializers.ValidationError(
                        {"current_password": "Mật khẩu hiện tại không đúng"}
                    )
            instance.set_password(new_password)

        instance.save()
        return instance