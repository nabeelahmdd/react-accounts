from django.contrib import admin
from parler.admin import TranslatableAdmin
from blog.models import Category, Article

class CategoryAdmin(TranslatableAdmin):
    list_display = ('title', 'slug', 'parent', )

    fieldsets = (
        (None, {
            'fields': (
                'title', 'slug', 'parent', 'is_featured', 'meta_name', 
                'meta_description', 'is_active',
            ),
        }),
    )
admin.site.register(Category, CategoryAdmin)

class ArticleAdmin(TranslatableAdmin):
    list_display = ('title', 'slug', 'cr_date', 'up_date', )

    fieldsets = (
        (None, {
            'fields': (
                'title', 'slug', 'body', 'image', 'category', 'meta_name', 
                'meta_description', 'is_active',
            ),
        }),

    )

    def save_model(self, request, obj, form, change):
        obj.author_id = request.user.id
        super().save_model(request, obj, form, change)

admin.site.register(Article, ArticleAdmin)