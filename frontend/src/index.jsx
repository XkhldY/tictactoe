import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import { Board } from "./components/board";
import { Scoreboard } from "./components/scoreboard";

import "./styles/variables.css";
import "./styles/base.css";
import "./styles/board.css";
import "./styles/box.css";
import "./styles/buttons.css";
import "./styles/scoreboard.css";

class App extends React.Component {
  state = {
    playerOneName: "Ali",
    playerTwoName: "Eid",
  };

  handlePlayerNameChange = (stateKey, stateValue) => {
    this.setState({
      [stateKey]: stateValue,
    });
  };

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Route
            exact
            path="/"
            render={() => (
              <Scoreboard
                state={this.state}
                nameChangeHandler={this.handlePlayerNameChange}
              />
            )}
          />
          <Route
            path="/board"
            render={() => (
              <Board
                state={this.state}
                nameChangeHandler={this.handlePlayerNameChange}
              />
            )}
          />
        </BrowserRouter>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
