from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("search", views.search, name="search"),
    path("add", views.add, name="add"),
    path("explore", views.explore, name="explore"),
    path("Sauce/<int:post_id>", views.sauce, name="Sauce"),
    path("profile", views.profile, name="profile"),

    # API
    path("posts", views.Allposts, name="posts"),
    path("post/<int:post_id>", views.post, name="post"),
    path("rating/<int:post_id>", views.ratingA, name="rating"),
    path("review/<int:post_id>", views.review, name="review"),
]