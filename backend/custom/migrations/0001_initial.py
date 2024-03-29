# Generated by Django 4.2.2 on 2023-06-10 11:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='email address')),
                ('phone_number', models.CharField(max_length=15)),
                ('image', models.ImageField(blank=True, null=True, upload_to='customer_images')),
                ('gender', models.CharField(blank=True, choices=[('f', 'female'), ('m', 'male'), ('r', 'rather not say ')], max_length=20, null=True)),
                ('is_password_change', models.BooleanField(default=False)),
                ('password_change_date', models.DateTimeField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('staff', models.BooleanField(default=False)),
                ('manager', models.BooleanField(default=False)),
                ('store_manager', models.BooleanField(default=False)),
                ('ex_username', models.CharField(blank=True, max_length=250, null=True)),
                ('first_name', models.CharField(max_length=250, null=True)),
                ('last_name', models.CharField(max_length=250, null=True)),
                ('date_joined', models.DateTimeField(auto_now_add=True, null=True)),
                ('last_update', models.DateTimeField(auto_now_add=True, null=True)),
                ('soft_delete', models.BooleanField(default=False)),
                ('cr_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, related_name='user_cr_by', to=settings.AUTH_USER_MODEL)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('up_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.RESTRICT, related_name='user_up_by', to=settings.AUTH_USER_MODEL)),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
