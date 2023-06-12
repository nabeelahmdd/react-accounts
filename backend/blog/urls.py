from django.urls import path, include
from rest_framework import routers
from blog.views import *

router = routers.DefaultRouter()
router.register('category', CategoryListViewSet)
router.register('article', ArticleListViewSet)

urlpatterns = [
    path('api/', include((router.urls, 'blog'))),
]