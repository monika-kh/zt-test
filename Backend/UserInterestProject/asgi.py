
# import os

# from channels.routing import ProtocolTypeRouter
# from django.core.asgi import get_asgi_application

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'UserInterestProject.settings')
# # Initialize Django ASGI application early to ensure the AppRegistry
# # is populated before importing code that may import ORM models.
# django_asgi_app = get_asgi_application()

# application = ProtocolTypeRouter({
#     "http": django_asgi_app,
#     # Just HTTP for now. (We can add other protocols later.)
# })

# ---------------------------------------------------------------------------------------------

# import os
# from django.core.asgi import get_asgi_application
# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.auth import AuthMiddlewareStack
# from app import routing

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'UserInterestProject.settings')

# application = ProtocolTypeRouter({
#     "http": get_asgi_application(),
#     "websocket": AuthMiddlewareStack(
#         URLRouter(
#             routing.websocket_urlpatterns
#         )
#     ),
# })

# ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


# asgi.py

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from app import routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'UserInterestProject.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            routing.websocket_urlpatterns
        )
    ),
})


# UserInterestProject/asgi.py
# import os
# from django.core.asgi import get_asgi_application
# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.auth import AuthMiddlewareStack
# from app.middlewaree import TokenAuthMiddleware
# import app.routing

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'UserInterestProject.settings')

# application = ProtocolTypeRouter({
#     "http": get_asgi_application(),
#     "websocket": TokenAuthMiddleware(
#         AuthMiddlewareStack(
#             URLRouter(
#                 app.routing.websocket_urlpatterns
#             )
#         )
#     ),
# })

