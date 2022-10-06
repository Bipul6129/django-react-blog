from django.urls import path
from .views import PostListCreate, PostUpdateDelete

urlpatterns = [
    path('',PostListCreate.as_view(),name='listcreate'),
    path('<int:pk>',PostUpdateDelete.as_view(),name='updatedelete'),
]