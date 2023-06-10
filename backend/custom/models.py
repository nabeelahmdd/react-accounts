from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)
from decimal import Decimal

# Create your models here.


GENDER_CHOICES = (
    ('f', 'female'),
    ('m', 'male'),
    ('r', 'rather not say ')
)


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_staffuser(self, email, password):
        """
        Creates and saves a staff user with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.staff = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(
        verbose_name='email address', max_length=255, unique=True
    )
    phone_number = models.CharField(max_length=15)
    image = models.ImageField(
        upload_to="customer_images", null=True, blank=True)
    gender = models.CharField(
        max_length=20, choices=GENDER_CHOICES,
        null=True, blank=True
    )
    is_password_change = models.BooleanField(default=False)
    password_change_date = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)  # a admin user; non super-user
    manager = models.BooleanField(default=False)  # a superuser
    store_manager = models.BooleanField(default=False)
    username = None
    ex_username = models.CharField(max_length=250, null=True, blank=True)
    first_name = models.CharField(max_length=250, null=True)
    last_name = models.CharField(max_length=250, null=True)
    date_joined = models.DateTimeField(auto_now_add=True, null=True)
    last_update = models.DateTimeField(auto_now_add=True, null=True)

    soft_delete = models.BooleanField(default=False)
    cr_by = models.ForeignKey('User', on_delete=models.RESTRICT,
                              related_name="user_cr_by", null=True, blank=True)
    up_by = models.ForeignKey('User', on_delete=models.RESTRICT,
                              related_name="user_up_by", null=True, blank=True)
    # notice the absence of a "Password field", that is built in.

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # Email & Password are required by default.

    objects = UserManager()

    def get_full_name(self):
        # The user is identified by their email address
        return self.email

    def get_short_name(self):
        # The user is identified by their email address
        return self.email

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.staff

    @property
    def is_manager(self):
        "Is the user a member of manager?"
        return self.manager

    @property
    def isAdmin(self):
        "Is the user a is_superuser member?"
        return self.is_superuser

    @property
    def category_name(self):
        "Is the user a is_superuser member?"
        return self.category.name if self.category else ""
