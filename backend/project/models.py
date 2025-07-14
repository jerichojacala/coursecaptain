#project\models.py
#Jericho Jacala jjacala@bu.edu
#define the models for the app
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator #impose limits on the satisfaction score (0-5)
from django.core.validators import RegexValidator

class School(models.Model):
    '''encapsulate the idea of a school'''
    name = models.TextField(blank=False)
    municipality = models.TextField(blank=False)
    subdivision = models.TextField(blank=True)
    country = models.TextField(blank=False)
    url = models.URLField(blank=True)

    def __str__(self):
        '''Return a string representation of this object'''
        return f'{self.name}'
    
class Subschool(models.Model):
    '''encapsulate the idea of a subschool, such as medical or business school'''
    name = models.TextField(blank=False)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    abbreviation = models.CharField(max_length=5, blank=True)
    url = models.URLField(blank=True)

    def __str__(self):
        '''Return a string representation of this object'''
        return f'{self.school} {self.name}'

# Legacy models

class Student(models.Model):
    '''encapsulate the idea of a student'''
    first_name = models.TextField(blank=False)
    last_name = models.TextField(blank=False)
    email = models.TextField(blank=False)
    image_file = models.ImageField(blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="student_profile")
    school = models.ForeignKey(School, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        '''Return a string representation of this object'''
        return f'{self.first_name} {self.last_name}'
    
    def get_schedules(self):
        '''Return a QuerySet of all schedules on this Student'''

        #use the ORM to retrieve schedules for which the FK is this student
        schedules = Schedule.objects.filter(student=self)
        return schedules
    
class Review(models.Model):
    '''encapsulate the idea of a review'''
    student = models.ForeignKey("Student", on_delete=models.CASCADE)
    course = models.ForeignKey("Course", on_delete=models.CASCADE)
    difficulty = models.IntegerField(blank=False)
    satisfaction = models.IntegerField(blank=False,validators=[MinValueValidator(0), MaxValueValidator(5)])
    grade = models.CharField(max_length=3)
    semester = models.TextField(blank=False)
    year = models.IntegerField(blank=False)
    notes = models.TextField(blank=False)
    timestamp = models.DateTimeField(auto_now=True)
    title = models.TextField(blank=False)
    def __str__(self):
        '''Return a string representation of this object'''
        return f'{self.title} by {self.student}'
    

class Course(models.Model):
    '''encapsulate the idea of a course'''
    professor = models.ForeignKey("Professor", on_delete=models.CASCADE)
    department = models.TextField(blank=False)
    number = models.IntegerField(blank=False)
    credits = models.IntegerField(blank=False)
    subschool = models.ForeignKey(Subschool, on_delete=models.CASCADE, blank=True)
    school = models.ForeignKey(School, on_delete=models.CASCADE, blank=True)
    def __str__(self):
        '''Return a string representation of this object'''
        return f'{self.subschool} {self.department} {self.number} by {self.professor}'
    
    def get_reviews(self):
        '''Return a QuerySet of all reviews on this course'''

        #use the ORM to retrieve reviews for which the FK is this course
        reviews = Review.objects.filter(course=self)
        return reviews

    def get_course_load(self):
        '''Returns the average course load in weekly hours'''
        reviews = Review.objects.filter(course=self)
        avg = 0
        for review in reviews:
            avg += review.difficulty
        if len(reviews) > 0:
            avg /= len(reviews)
        else:
            avg = 0 #sometimes we will have no reviews for a course, in this case return 0 to avoid errors
        return avg
    
    def get_course_satisfaction(self):
        '''Returns the average course satisfaction'''
        reviews = self.get_reviews()
        avg = 0
        for review in reviews:
            avg += review.satisfaction
        if len(reviews) > 0:
            avg /= len(reviews)
        else:
            avg = 0 #sometimes we will have no reviews for a course, in this case return 0 to avoid errors
        return avg
    
    def get_students(self):
        '''Return a qs of all students in this course'''
        #get the instances of where the courses are scheduled
        registrations = Registration.objects.filter(course=self)

        #from these registrations, find all of these schedules where the registrations are present
        schedule_ids = registrations.values_list('schedule_id', flat=True)

        #query all students that have these schedules
        students = Student.objects.filter(schedule__id__in=schedule_ids).distinct()
        return students

class Professor(models.Model):
    '''encapsulate the idea of a professor'''
    first_name = models.TextField(blank=False)
    last_name = models.TextField(blank=False)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    url = models.URLField(blank=True)
    def __str__(self):
        '''Return a string representation of this object'''
        return f'{self.first_name} {self.last_name}'
    
    def get_courses(self):
        '''Return a QuerySet of all courses taught by this professor'''

        #use the ORM to retrieve courses for which the FK is this professor
        courses = Course.objects.filter(professor=self)
        return courses
    
    def get_professor_satisfaction(self):
        '''Returns the average course load in weekly hours'''
        courses = self.get_courses()
        avg = 0
        for course in courses:
            avg += course.get_course_satisfaction()
        if len(courses) > 0:
            avg /= len(courses)
        else:
            avg = 0 #just in case we will have no courses for a professor, in this case return 0 to avoid errors
        return avg
    
    def get_reviews(self):
        '''returns all reviews for a professor'''
        reviews = Review.objects.filter(course__professor=self) #filter all reviews for which the course's professor that the review is linked to is this professor
        return reviews

class Schedule(models.Model):
    '''encapsulate the idea of a schedule that a student might try making'''
    student = models.ForeignKey("Student", on_delete=models.CASCADE)
    title = models.TextField(blank=False)
    def __str__(self):
        '''Return a string representation of this object'''
        return f'{self.title}'
    
    def get_registrations(self):
        '''Returns the queryset of all registrations for a given schedule'''
        querylist = Registration.objects.filter(schedule=self) #create list of registrations for the schedule
        courses = []
        for registration in querylist:
            courses.append(registration)
        return courses
    
    def get_schedule_load(self):
        '''Finds the total course load for a schedule in weekly hours'''
        registrations = self.get_registrations()
        sum = 0
        for registration in registrations:
            sum += registration.course.get_course_load()
        return sum
    
    def get_schedule_satisfaction(self):
        '''Finds the average course satisfaction for a schedule'''
        registrations = self.get_registrations()
        avg = 0
        for registration in registrations:
            avg += registration.course.get_course_satisfaction()
        if len(registrations) > 0:
            avg /= len(registrations)
        else:
            avg = 0 #just in case we will have no courses for a professor, in this case return 0 to avoid errors
        return avg
    
    def add_registration(self, course):
        '''adds a course to a schedule'''
        if not (Registration.objects.filter(schedule=self, course=course).exists()): 
            Registration.objects.create(schedule=self,course=course) #similar to add friend from mini_fb- how we create registrations manually


class Registration(models.Model):
    '''encapsulate the idea of a course in a schedule-models many-to-many relationship, much like friend from mini_fb'''
    course  = models.ForeignKey("Course", on_delete=models.CASCADE)
    schedule  = models.ForeignKey("Schedule", on_delete=models.CASCADE)

    def __str__(self):
        '''Return the string representation of the registration'''
        return f'{self.course} in {self.schedule}'

class Phone(models.Model):
    """Model representing phone numbers associated with students"""
    
    # Phone type constants - using class variables for better organization
    class PhoneTypes(models.IntegerChoices):
        MOBILE = 0
        HOME = 1
        WORK = 2
        FAX = 3
        OTHER = 4
    
    # Phone verification status constants
    class VerificationStatus(models.IntegerChoices):
        UNVERIFIED = 0
        PENDING = 1
        VERIFIED = 2
    
    # Link to Django's built-in User model (or your custom User model)
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
    )
    
    # Phone number field with international format validation
    number = models.CharField(
        max_length=20,
        validators=[
            RegexValidator(
                regex=r'^\+[1-9]\d{1,14}$',  # E.164 format
                message="Phone number must be in E.164 format (+1234567890)"
            )
        ],
    )
    
    # Phone type with predefined choices
    type = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(4)],
        default=PhoneTypes.MOBILE,
    )
    
    # Verification status tracking
    verification_status = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(2)],
        default=VerificationStatus.UNVERIFIED,
    )
    
    # Verification metadata
    verification_code = models.CharField(
        max_length=6,
        blank=True,
        null=True,
    )
    verification_sent_at = models.DateTimeField(
        blank=True,
        null=True,
    )
    
    # Primary number flag with index for faster lookups
    is_primary = models.BooleanField(
        default=False,
        db_index=True
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # Ensure a user can't have duplicate phone numbers
        unique_together = ('student', 'number')
        # Default ordering by primary status then creation time
        ordering = ['-is_primary', '-created_at']
    
    def __str__(self):
        return f"{self.number}"
    
    def save(self, *args, **kwargs):
        """Ensure only one primary number per student"""
        if self.is_primary:
            # Remove primary status from other numbers for this student
            Phone.objects.filter(
                student=self.student,
                is_primary=True
            ).exclude(pk=self.pk).update(is_primary=False)
        super().save(*args, **kwargs)