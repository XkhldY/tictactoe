from pyexpat import model
from rest_framework import serializers
from .models import Scoreboard, Board



class BoardSerializer(serializers.ModelSerializer):
  class Meta:
    model = Board
    fields = ('current_board', )


class ScoreboardSerializer(serializers.ModelSerializer):
  class Meta:
    model = Scoreboard
    fields = '__all__'
