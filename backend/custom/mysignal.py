from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    try:
        context = {
            'current_user': reset_password_token.user,
            'username': reset_password_token.user.username,
            'email': reset_password_token.user.email,
            'token': reset_password_token.key
        }

        # render email text
        email_html_message = render_to_string(
            'email/password_reset_email.html', context)
        email_plaintext_message = render_to_string(
            'email/password_reset_subject', context)

        msg = EmailMultiAlternatives(
            "Reset Your {title} Password".format(title="react-boottsrap.com"),
            email_plaintext_message,
            settings.EMAIL_HOST_ADDRESS,
            [reset_password_token.user.email]
        )
        msg.attach_alternative(email_html_message, "text/html")
        msg.send()
        print(msg)
    except Exception as e:
        print(e, '******')
        pass
