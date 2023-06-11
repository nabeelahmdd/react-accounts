from django.urls import path, include
from custom.views.user_views import (
    MyTokenObtainPairView, RegisterViewSet,
    UserListView, UserDetailView,
    CheckEmailView, ChangePasswordView,
    ActivateUser
)

urlpatterns = [
    path('accounts/register/', RegisterViewSet.as_view(), name="register"),
    path('accounts/login/', MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('accounts/users/', UserListView.as_view()),
    path('user-detail/', UserDetailView.as_view(), name="users-detail"),
    path('email-check/<str:email>/', CheckEmailView.as_view()),
    path('accounts/change-password/', ChangePasswordView.as_view()),
    path('accounts/password_reset/',
         include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('accounts/activate/',
         ActivateUser.as_view(), name='activate'),
]
