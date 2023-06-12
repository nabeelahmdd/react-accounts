from django.db import models
from django.utils.translation import gettext as _
from parler.models import TranslatableModel, TranslatedFields
from django.utils.text import slugify

class Category(TranslatableModel):
    translations = TranslatedFields(
        title = models.CharField(_("Title"), max_length=200, unique=True),
    )
    slug = models.SlugField(unique=True, null=True, blank=True)
    parent = models.ForeignKey('Category', on_delete=models.RESTRICT, null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    meta_name = models.CharField(max_length=250, null=True, blank=True)
    meta_description = models.CharField(max_length=250, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
        
    def __str__(self):
        return self.title