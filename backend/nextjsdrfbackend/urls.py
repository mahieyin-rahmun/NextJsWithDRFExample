from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/posts/", include("posts.urls")),
    path("api/auth/", include("dj_rest_auth.urls")),  # endpoints provided by dj-rest-auth
    path("api/social/login/", include("nextjsdrfauth.urls")),  # our own views
]
