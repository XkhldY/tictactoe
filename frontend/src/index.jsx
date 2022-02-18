import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import { Board } from './components/board'
import { Scoreboard } from './components/scoreboard'


import './styles/variables.css'
import './styles/base.css'
import './styles/board.css'
import './styles/box.css'
import './styles/buttons.css'
import './styles/scoreboard.css'

class App extends React.Component {
  state = {
    playerOneName: 'Ali',
    playerTwoName: 'Eid'
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Route exact path="/" render={() => <Scoreboard state={this.state}  />}/>
          <Route path="/board" render={() => <Board state={this.state} />}/>
        </BrowserRouter>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
