from django.urls import path
from app.API import api as views

urlpatterns = [
    path("register/", views.RegisterView.as_view(), name="register"),
    path("login/", views.LoginView.as_view(), name="login"),
    #     path("userslist/", UsersList.as_view()),
    path("sentinterest/", views.SendFriendRequest.as_view()),
    path("acceptinterest/", views.AcceptRequestView.as_view()),
    path("rejectinterest/", views.RejectRequestView.as_view()),
    path("friend_list/", views.FriendListView.as_view()),
    path("pending_requests/", views.PendingRequestView.as_view()),
    path("allusers/", views.AllUserView.as_view()),
    path("ChatView/<int:receiver_id>", views.ChatView.as_view()),
]
