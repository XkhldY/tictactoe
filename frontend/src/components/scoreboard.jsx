import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export class Scoreboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
			playerOneName: this.props.state.playerOneName,
			playerTwoName: this.props.state.playerTwoName,
      scoreboard: []
    }
  }

  async componentDidMount() {
    this.refreshList()
  }

  refreshList = () => {
    const score_list = []
    axios.get('http://localhost:8000/api/scoreboard/')
      .then(response => {
        Promise.all(response.data.map((scoreboard) => {
          return score_list.push([scoreboard.player_name, scoreboard.score])}));
    
    this.setState({scoreboard: score_list})
    })
  }

  handleInputChange = (event) => {
    event.preventDefault()

    let stateKey = event.target.dataset.name
    let stateValue = event.target.value

    this.setState({
      [stateKey]: stateValue
    })

    this.props.nameChangeHandler(stateKey, stateValue)
  }

  handleNameValidation = (event) => {
    if (this.state.playerOneName.length !== 0 && this.state.playerTwoName.length !== 0) {
      return
    } else {
      event.preventDefault()
    }
  }

  render() {
    return (
      <div className="view view--scoreboard">
        <h1 className="scoreboard__title">Tic Tac Toe</h1>

        <h2 className="scoreboard__subtitle">Would you like to play a game?</h2>

        <div className="scoreboard__names">
          <div className="scoreboard__name-box">
            <label htmlFor="playerOneName">Player one name (x):</label>

            <input id="playerOneName" className="scoreboard__input" type="text" value={this.state.playerOneName} onChange={this.handleInputChange} data-name="playerOneName" />
          </div>

          <div className="scoreboard__name-box">
            <label htmlFor="playerTwoName">Player two name (o):</label>

            <input id="playerTwoName" className="scoreboard__input" type="text" value={this.state.playerTwoName} onChange={this.handleInputChange} data-name="playerTwoName" />
          </div>
        </div>

        <Link to="/board" onClick={this.handleNameValidation} className="scoreboard__btn btn">Start new game aganist AI</Link>

        <h2 className="scoreboard__subtitle">scoreboard:</h2>

        {this.state.scoreboard.length === 0 && <p>There are no previous games to show.</p>}

        {this.state.scoreboard.length !== 0 && <ul className="scoreboard__list">

        <table id='scoreboard'>

               <tbody>
               <tr>
               <td bgcolor="LightBlue">player</td>
               <td bgcolor="LightBlue">score</td>
               </tr>
               {this.state.scoreboard.map((leader, key) => {

                return <tr key={key}>
                  <td>{leader[0]}</td>
                  <td>{leader[1]}</td>

                      </tr>
                })}
               </tbody>
            </table>



        </ul>}
      </div>
    )
  }
}
