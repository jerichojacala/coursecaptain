#project\serializer.py
#Jericho Jacala jjacala@bu.edu
#serialize models for api use

# blog/serializers.py
from rest_framework import serializers
from .models import *

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'

class SubschoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subschool
        fields = '__all__'


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name']

class ProfileSerializer(serializers.ModelSerializer):
    schedules = serializers.SerializerMethodField()
    class Meta:
        model = Student
        fields = ['id', 'first_name', 'last_name', 'schedules']

    def get_schedules(self, obj):
        schedules_qs = obj.get_schedules()
        return ScheduleSerializer(schedules_qs, many=True).data

class ReviewSerializer(serializers.ModelSerializer):
    student = StudentSerializer()
    class Meta:
        model = Review
        exclude = ['course']

class ProfessorSerializer(serializers.ModelSerializer):
    school = SchoolSerializer()
    class Meta:
        model = Professor
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
    
class RegistrationSerializer(serializers.ModelSerializer):
    # Accept course and schedule IDs on input
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    schedule = serializers.PrimaryKeyRelatedField(queryset=Schedule.objects.all())

    # Optional: serialize full course info when returning data
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['course'] = CourseSerializer(instance.course).data
        return ret

    class Meta:
        model = Registration
        fields = ['id', 'course', 'schedule']
    
class ScheduleSerializer(serializers.ModelSerializer):
    registrations = serializers.SerializerMethodField()
    schedule_load = serializers.SerializerMethodField()
    schedule_satisfaction = serializers.SerializerMethodField()

    class Meta:
        model = Schedule
        fields = ['id','title', 'registrations', 'schedule_load', 'schedule_satisfaction']

    def get_registrations(self, obj):
        registrations_qs = obj.get_registrations()
        return RegistrationSerializer(registrations_qs, many=True).data
    
    def get_schedule_load(self, obj):
        schedule_load = obj.get_schedule_load()
        return schedule_load

    def get_schedule_satisfaction(self, obj):
        schedule_satisfaction = obj.get_schedule_satisfaction()
        return schedule_satisfaction