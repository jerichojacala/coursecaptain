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

class CourseSerializer(serializers.ModelSerializer):
    professor = ProfessorSerializer()
    school = SchoolSerializer()
    class Meta:
        model = Course
        fields = '__all__'