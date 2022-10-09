from django.urls import path
from .views import PostListCreate, PostUpdateDelete,UserPostList

urlpatterns = [
    path('',PostListCreate.as_view(),name='listcreate'),
    path('<int:pk>',PostUpdateDelete.as_view(),name='updatedelete'),
    path('userblog',UserPostList.as_view(),name='userblog'),

]