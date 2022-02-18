from django.urls import path
from .views import  BoardViewset, ScoreboardViewset


urlpatterns = [
    path(r'board/', BoardViewset.as_view()),
    path(r'scoreboard/', ScoreboardViewset.as_view()),

]