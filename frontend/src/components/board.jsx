import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Box } from "./board-box";

import * as utils from "../utils/functions";

export class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boxes: Array(9).fill(null),
      playerOneName: this.props.state.playerOneName,
      playerTwoName: this.props.state.playerTwoName,
      xIsNext: true,
    };
  }

  handleBoxClick(index) {
    const boxes = this.state.boxes.slice();

    if (utils.findWinner(boxes) || boxes[index]) {
      return;
    }

    if (utils.areAllBoxesClicked(boxes) === true) {
      return;
    }
    boxes[index] = "x";

    this.setState({
      boxes: boxes,
      xIsNext: !this.state.xIsNext,
    });

    if (utils.findWinner(boxes)) {
      return;
    }
    const dic = {};
    boxes.forEach((elm, index) => {
      dic[index] = elm;
    });
    let st = JSON.stringify(dic);
    const bodyParameters = { current_board: st };

    axios
      .post(
        "http://localhost:8000/api/board/",
        bodyParameters
        //   config
      )
      .then((response) => {
        this.setState({ boxes: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleBoardRestart = () => {
    this.setState({
      boxes: Array(9).fill(null),
      xIsNext: true,
    });
  };

  render() {
    const winner = utils.findWinner(this.state.boxes);
    const isFilled = utils.areAllBoxesClicked(this.state.boxes);

    let status;

    if (winner) {
      status = `The winner is: ${
        winner === "x" ? this.state.playerOneName : this.state.playerTwoName
      }!`;

      axios.post("http://localhost:8000/api/scoreboard/", {
        player_name: `${
          winner === "x" ? this.state.playerOneName : this.state.playerTwoName
        }`,
      });
    } else if (!winner && isFilled) {
      status = "Game drawn!";
    } else {
      status = `It is ${
        this.state.xIsNext ? this.state.playerOneName : this.state.playerTwoName
      }'s turn.`;
    }

    return (
      <div className="view view--board">
        <Link to="/" className="board-back-link">
          Go back to scoreboard
        </Link>

        <div className="board-wrapper">
          <h2 className="board-heading">{status}</h2>
          <div className="board">
            <div className="board-row">
              <Box
                value={this.state.boxes[0]}
                onClick={() => this.handleBoxClick(0)}
              />

              <Box
                value={this.state.boxes[1]}
                onClick={() => this.handleBoxClick(1)}
              />

              <Box
                value={this.state.boxes[2]}
                onClick={() => this.handleBoxClick(2)}
              />
            </div>

            <div className="board-row">
              <Box
                value={this.state.boxes[3]}
                onClick={() => this.handleBoxClick(3)}
              />

              <Box
                value={this.state.boxes[4]}
                onClick={() => this.handleBoxClick(4)}
              />

              <Box
                value={this.state.boxes[5]}
                onClick={() => this.handleBoxClick(5)}
              />
            </div>

            <div className="board-row">
              <Box
                value={this.state.boxes[6]}
                onClick={() => this.handleBoxClick(6)}
              />

              <Box
                value={this.state.boxes[7]}
                onClick={() => this.handleBoxClick(7)}
              />

              <Box
                value={this.state.boxes[8]}
                onClick={() => this.handleBoxClick(8)}
              />
            </div>
          </div>
        </div>
        {winner && (
          <button className="board__btn btn" onClick={this.handleBoardRestart}>
            Start new game
          </button>
        )}
      </div>
    );
  }
}
