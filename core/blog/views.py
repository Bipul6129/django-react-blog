from django.shortcuts import render
from .serializers import PostSerializer
from .models import Post
from rest_framework import generics
from rest_framework.permissions import SAFE_METHODS,BasePermission,IsAuthenticatedOrReadOnly,IsAdminUser
# Create your views here.

class PostUserWritePermission(BasePermission):
    message = 'Eding only restricted to author'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.author ==request.user

class PostListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Post.objects.all()
    serializer_class= PostSerializer

class PostUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [PostUserWritePermission]
    queryset=Post.objects.all()
    serializer_class=PostSerializer


