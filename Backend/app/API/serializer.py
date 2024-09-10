from django.contrib.auth.hashers import make_password
from rest_framework import serializers

from app.models import Person, ChatMessage


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ["username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = Person(username=validated_data["username"])
        user.set_password(validated_data["password"])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class PersonSerializer(serializers.ModelSerializer):
    friends = serializers.StringRelatedField(many=True, read_only=True)
    sent_requests = serializers.StringRelatedField(many=True, read_only=True)
    received_requests = serializers.SlugRelatedField(
        many=True, read_only=True, slug_field="username"
    )

    class Meta:
        model = Person
        fields = (
            "id",
            "username",
            "email",
            "friends",
            "sent_requests",
            "received_requests",
        )


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ("id", "username")


class SentRequestSerializer(serializers.Serializer):
    to_request = serializers.IntegerField()


class AcceptRequestSerializer(serializers.Serializer):
    accept_request = serializers.IntegerField()


class RejectRequestSerializer(serializers.Serializer):
    reject_request = serializers.IntegerField()


class SearchSerializer(serializers.Serializer):
    search = serializers.CharField(max_length=20)


class PersonChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ["username", "id"]


class ChatMessageSerializer(serializers.ModelSerializer):
    sender = PersonChatSerializer()
    receiver = PersonChatSerializer()

    class Meta:
        model = ChatMessage
        fields = ["id", "sender", "receiver", "message", "timestamp"]
