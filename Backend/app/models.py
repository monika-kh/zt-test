from django.contrib.auth.models import AbstractUser
from django.db import models


class Person(AbstractUser):
    friends = models.ManyToManyField(
        "self", blank=True, related_name="friends_set", symmetrical=True
    )
    sent_requests = models.ManyToManyField(
        "self", blank=True, related_name="sent_requests_set", symmetrical=False
    )
    received_requests = models.ManyToManyField(
        "self", blank=True, related_name="received_requests_set", symmetrical=False
    )

    def __str__(self):
        return self.username


class ChatMessage(models.Model):
    sender = models.ForeignKey(
        Person, related_name="sent_messages", on_delete=models.CASCADE
    )
    receiver = models.ForeignKey(
        Person, related_name="received_messages", on_delete=models.CASCADE
    )
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender} to {self.receiver}: {self.message}"
