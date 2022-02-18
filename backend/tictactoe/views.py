from rest_framework.response import Response
from rest_framework import views, status
from .serializers import ScoreboardSerializer
from .models import Scoreboard
import json
import random
import logging

logger = logging.getLogger(__name__)


class BoardViewset(views.APIView):

    def post(self, request):
        data = request.data

        try:
            current_board = json.loads(data['current_board'])
            open_indexes = [i for i, j in current_board.items() if not j]

            if not open_indexes:
                logger.info(f'{logger.name}: no more cells available')
                return Response(current_board.values(), status=status.HTTP_200_OK)

            else:
                index = random.choice(open_indexes)
                current_board[index] = "o"
                logger.info(f'{logger.name}: random AI played its turn')
                return Response(current_board.values(), status=status.HTTP_200_OK)

        except KeyError as e:
            logger.error(f'{logger.name}: cannot find key {e} on the received data')
            return Response(f'cannot find key {e} on the received data', status=status.HTTP_400_BAD_REQUEST)

        except ValueError as e:
            logger.error(f'{logger.name}: current board should be a list')
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


class ScoreboardViewset(views.APIView):

    def get(self, request):
        scoreboard = Scoreboard.objects.all().order_by('-score')
        serializer = ScoreboardSerializer(scoreboard, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        try:
            player, created = Scoreboard.objects.get_or_create(player_name=data['player_name'])
            player.score += 1
            player.save()
            if created:
                return Response("new player added", status=status.HTTP_201_CREATED)
            return Response(f"{player.player_name} score incremented", status=status.HTTP_200_OK)

        except KeyError as e:
            logger.error(f'{logger.name}: cannot find key {e} on the received data')
            return Response(f'cannot find key {e} on the received data', status=status.HTTP_400_BAD_REQUEST)
