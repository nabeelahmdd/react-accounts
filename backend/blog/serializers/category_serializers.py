from parler_rest.serializers import TranslatableModelSerializer
from blog.models import Category
from parler_rest.fields import TranslatedFieldsField
from backend.mixins import TranslatedSerializerMixin

class CategorySerializer(TranslatedSerializerMixin, TranslatableModelSerializer):
    translations = TranslatedFieldsField(shared_model=Category)
    class Meta:
        model = Category
        fields = '__all__'