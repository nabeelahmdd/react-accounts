from rest_framework.permissions import IsAdminUser
from rest_framework import permissions


class IsSuperUser(IsAdminUser):
    message = 'This access is restricted to Admin User.'

    def has_permission(self, request, view):
        return bool(request.user.is_authenticated and request.user.is_superuser)


class IsManagerUser(permissions.BasePermission):
    message = 'This access is restricted to Manager User.'

    def has_permission(self, request, view):
        return bool(request.user.is_authenticated and request.user.manager)


class IsStaffUser(permissions.BasePermission):
    message = 'This access is restricted to Staff User.'

    def has_permission(self, request, view):
        return bool(request.user.is_authenticated and request.user.staff)


class IsStoreManagerUser(permissions.BasePermission):
    message = 'This access is restricted to Manager User.'

    def has_permission(self, request, view):
        return bool(request.user.is_authenticated and request.user.store_manager)
