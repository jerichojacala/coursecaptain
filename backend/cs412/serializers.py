# cs412/serializers.py
from djoser.serializers import UserSerializer as BaseUserSerializer
from project.serializers import ProfileSerializer, ScheduleSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
from project.models import Student

User = get_user_model()

class CustomUserSerializer(BaseUserSerializer):
    student_profile = ProfileSerializer(many=True, read_only=True)
    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = ("id", "email", "username", "student_profile")  # Add any others you want
    
