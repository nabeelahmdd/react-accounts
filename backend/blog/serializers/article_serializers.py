from parler_rest.serializers import TranslatableModelSerializer
from blog.models import Article
from parler_rest.fields import TranslatedFieldsField
from backend.mixins import TranslatedSerializerMixin

class ArticleSerializer(TranslatedSerializerMixin, TranslatableModelSerializer):
    translations = TranslatedFieldsField(shared_model=Article)
    class Meta:
        model = Article
        fields = '__all__'