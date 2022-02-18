from django.db import models

# Create your models here.
class Board(models.Model):
  current_board = models.CharField(max_length=9)


class Scoreboard(models.Model):
  player_name = models.CharField(primary_key=True, max_length=100)
  score = models.IntegerField(default=0)