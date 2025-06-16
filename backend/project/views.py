#project\views.py
#define the views for the app

from django.shortcuts import render
from django.views.generic import ListView, DetailView, CreateView, DeleteView, UpdateView, View
from .models import * #import the models
from django.urls import reverse
from .forms import *
from django.contrib.auth.mixins import LoginRequiredMixin #require some views only be accessed by authenticated users
from django.contrib.auth import login
from typing import Any
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import *
from django.db.models import Q

# Create your views here.

#API classes

class CourseList(ListAPIView):
    serializer_class = CourseSerializer
    
    def get_queryset(self):
        queryset = Course.objects.all()
        search_term = self.request.query_params.get('search', '').strip()
        words = search_term.split()
        # search_field = self.request.query_params.get('field', 'all')
        
        for word in words:
            queryset = queryset.filter(
                (Q(department__icontains=word) |
                Q(number__icontains=word)) |
                Q(professor__last_name__icontains=word) |
                Q(professor__first_name__icontains=word)
            )

        return queryset
    
class ProfessorAPIView(APIView):
    def get(self, request):
        professors = Professor.objects.all()
        serializer = ProfessorSerializer(professors, many = True)
        return Response(serializer.data)
    
class SchoolAPIView(APIView):
    def get(self, request):
        schools = School.objects.all()
        serializer = SchoolSerializer(schools, many=True)
        return Response(serializer.data)
    
class SchoolList(ListAPIView):
    serializer_class = SchoolSerializer
    
    def get_queryset(self):
        queryset = School.objects.all()
        search_term = self.request.query_params.get('search', '').strip()
        # search_field = self.request.query_params.get('field', 'all')
        
        queryset = queryset.filter(
            Q(name__icontains=search_term) |
            Q(municipality__icontains=search_term) |
            Q(subdivision__icontains=search_term) |
            Q(country__icontains=search_term)
        )
        return queryset
    
class SchoolDetail(RetrieveAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer
    lookup_field = 'pk'  # Uses primary key (id)

class CourseDetail(RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    lookup_field = 'pk'