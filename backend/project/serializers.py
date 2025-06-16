#project\serializer.py
#Jericho Jacala jjacala@bu.edu
#serialize models for api use

# blog/serializers.py
from rest_framework import serializers
from .models import *

class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor
        fields = '__all__'

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'

class SubschoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subschool
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    professor = ProfessorSerializer()
    school = SchoolSerializer()
    subschool = SubschoolSerializer()
    reviews = serializers.SerializerMethodField()
    course_load = serializers.SerializerMethodField()
    course_satisfaction = serializers.SerializerMethodField()
    class Meta:
        model = Course
        fields = '__all__'

    def get_reviews(self, obj):
        reviews_qs = obj.get_reviews()
        return ReviewSerializer(reviews_qs, many=True).data
    
    def get_course_load(self, obj):
        course_load = obj.get_course_load()
        return course_load

    def get_course_satisfaction(self, obj):
        course_satisfaction = obj.get_course_satisfaction()
        return course_satisfaction

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name']

class ReviewSerializer(serializers.ModelSerializer):
    student = StudentSerializer()
    class Meta:
        model = Review
        exclude = ['course']