from rest_framework import mixins, viewsets
from blog.models import Category
from blog.serializers import CategorySerializer
# Create your views here.
class CategoryListViewSet(
    mixins.ListModelMixin,
    viewsets.GenericViewSet
):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
