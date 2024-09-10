import json
from channels.generic.websocket import AsyncWebsocketConsumer
from app.models import Person, ChatMessage
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from rest_framework.authtoken.models import Token

class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        # Extract room_name and user_id from the URL route
        self.room_name = self.scope["url_route"]["kwargs"].get("room_name")
        self.room_group_name = f"chat_{self.room_name}"

        # Authenticate user using the token in the headers
        headers = dict(self.scope["headers"])
        auth_header = headers.get(b"authorization", b"").decode("utf-8")

        if auth_header.startswith("Token "):
            token_key = auth_header[len("Token ") :]
            try:
                token = await self.get_token(token_key)
                user = await self.get_user(token.user_id)
            except (Token.DoesNotExist, Person.DoesNotExist):
                user = AnonymousUser()
            self.scope['user'] = user
        else:
            user = self.scope['user']

        self.scope["user"] = user

        # Join the room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        # Send a message to the WebSocket to confirm connection
        await self.accept()

    async def disconnect(self, close_code):
        # Leave the room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        # Handle incoming WebSocket messages
        text_data_json = json.loads(text_data)
        message = text_data_json.get("message", "")
        sender = self.scope["user"]
        self.receiver_id = self.scope["url_route"]["kwargs"].get("user_id")

        try:
            receiver = await self.get_user(self.receiver_id)

        except Person.DoesNotExist:
            receiver = AnonymousUser()

        # Save message to the database
        chat_message = await self.save_message(sender, receiver, message)

        # Send message to the room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
                "sender": sender.username,
                # 'timestamp': chat_message.timestamp.isoformat()  # Ensure timestamp is serializable
            },
        )

    async def chat_message(self, event):

        await self.send(
            text_data=json.dumps(
                {
                    "message": event["message"],
                    "sender": event["sender"],
                    # 'timestamp': event['timestamp']
                }
            )
        )

    @database_sync_to_async
    def get_token(self, token_key):
        """
        Synchronous method to get a Token object by its key.
        This method is wrapped by database_sync_to_async to be used in an async context.
        """
        return Token.objects.get(key=token_key)

    @database_sync_to_async
    def get_user(self, user_id):
        return Person.objects.get(id=user_id)

    @database_sync_to_async
    def save_message(self, sender, receiver, message):
        """
        Save a message to the database.
        This method is wrapped by database_sync_to_async to be used in an async context.
        """
        return ChatMessage.objects.create(
            sender=sender, receiver=receiver, message=message
        )
