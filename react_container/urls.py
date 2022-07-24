from django.urls import path, re_path
from django.contrib.auth import views as auth_views

from . import views

urlpatterns = [
    path('auth/login', views.login),
    path('auth/forum', views.login),
    path('auth/logout', views.logout),
    path('api/getEvents/', views.getEvents.as_view()),
    path('api/getRestaurants/', views.getRestaurants.as_view()),
    re_path(r'', views.catchall),
]