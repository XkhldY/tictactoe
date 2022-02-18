from django.test import TestCase
from .models import Scoreboard


# Create your tests here.
class ScoreboardTestCase(TestCase):
    def setUp(self) -> None:
        Scoreboard.objects.create(player_name='eid', score=9)
        Scoreboard.objects.create(player_name='ali', score=10)
    
    def test_scoreboard_model(self):
        scoreboard = Scoreboard.objects.all().order_by('-score')
        self.assertEqual(scoreboard[0].player_name, 'ali')
        self.assertEqual(scoreboard[0].score, 10)

    def test_unique_player_name(self):
        player, created = Scoreboard.objects.get_or_create(player_name='eid')

        self.assertFalse(created)
