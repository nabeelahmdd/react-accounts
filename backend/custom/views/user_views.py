from custom.serializers.user_serializer import (
    UserSerializer, UserSerializerWithToken,
    UserListSerializer, UserUpdateSerializer,
    ChangePasswordSerializer
)
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from custom.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from custom.permissions import (
    IsStaffUser
)
from django.http import Http404
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.password_validation import validate_password
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from custom.tokens import account_activation_token
# Create your views here.


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterViewSet(APIView):

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserListView(APIView):
    """
    List all user where soft_delete is False
    """
    permission_classes = [IsStaffUser]

    def get(self, request, format=None):
        instance = User.objects.filter(soft_delete=False).order_by('-id')
        serializer = UserListSerializer(instance, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(cr_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetailView(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk, soft_delete=False,)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, format=None):
        instance = self.get_object(request.user.id)
        serializer = UserUpdateSerializer(instance)
        return Response(serializer.data)

    def put(self, request, format=None):
        instance = self.get_object(request.user.id)
        serializer = UserUpdateSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save(up_by=request.user)
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CheckEmailView(APIView):

    def get(self, request, email, format=None):
        instance = User.objects.filter(email=email)
        if instance:
            return Response({'detail': 'Exists'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'detail': 'Not Exist'}, status=status.HTTP_200_OK)


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def validate_password(self, value):
        validate_password(value)
        return value

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"detail": "Wrong password."}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            try:
                self.object.set_password(self.validate_password(
                    serializer.data.get("new_password")))
                self.object.save()
            except Exception as e:
                return Response({"detail": e}, status=status.HTTP_400_BAD_REQUEST)
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ActivateUser(APIView):

    def post(self, request, *args, **kwargs):
        data = request.data
        uidb64 = data.get('uidb64', '')
        token = data.get('token', '')
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            message = 'Thank you for your email confirmation. Now you can login your account.'
            return Response({'detail': message}, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Activation link is invalid!'}, status=status.HTTP_400_BAD_REQUEST)
