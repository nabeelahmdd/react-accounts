from rest_framework import mixins, viewsets
from blog.models import Article
from blog.serializers import ArticleSerializer
# Create your views here.
class ArticleListViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet
):
    lookup_field = 'slug'
    queryset = Article.objects.filter(is_active=True)
    serializer_class = ArticleSerializer
