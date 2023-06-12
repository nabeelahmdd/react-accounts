from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext as _
from parler.models import TranslatableModel, TranslatedFields
from custom.models import User
from blog.models import Category

class Article(TranslatableModel):
    translations = TranslatedFields(
        title = models.CharField(_("Title"), max_length=200, unique=True),
        body = models.TextField(_("Content"), blank=True)
    )
    slug = models.SlugField(unique=True, null=True, blank=True)
    image = models.ImageField(
    	null=True, upload_to='article_images'
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE
    )

    meta_name = models.CharField(max_length=250, null=True, blank=True)
    meta_description = models.CharField(
    	max_length=250, null=True, blank=True
    )

    is_active = models.BooleanField(default=True)
    cr_date = models.DateTimeField(auto_now_add=True)
    up_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['cr_date']
        verbose_name_plural = "Articles"

    def __str__(self):
        return self.title
    