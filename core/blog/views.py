from django.shortcuts import render
from .serializers import PostSerializer
from .models import Post
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import SAFE_METHODS,IsAuthenticated,BasePermission,IsAuthenticatedOrReadOnly,IsAdminUser
# Create your views here.

class PostUserWritePermission(BasePermission):
    message = 'Eding only restricted to author'

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        return obj.author ==request.user

#LIST ALL POST AND CREATE A NEW POST
class PostListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Post.objects.all()
    serializer_class= PostSerializer
    

    def create(self,request,*args,**kwargs):
        data=request.data
        data['author']=request.user.id
        serializer = PostSerializer(data=data)
        print(request.user.username)
        if serializer.is_valid():
            
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class PostUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [PostUserWritePermission]
    queryset=Post.objects.all()
    serializer_class=PostSerializer

#GET POST OF ONLY PARTICULAR LOGGED IN USER 
class UserPostList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def list(self,request,*args,**kwargs):
        user=request.user
        if user is not None:
            queryset = Post.objects.filter(author=user)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response({'message':'Error user must be logged in'})
        
        

        


