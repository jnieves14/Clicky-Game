import React, { Component } from 'react';
import GridLayout from "./components/GridLayout";
import Paper from "./components/PaperLayout";
import CharacterCard from "./components/CharacterCard";
import Score from "./components/Score";
import Alerts from "./components/Alerts";
import Nav from "./components/Nav";
import characters from "./characters.json";

class App extends Component {
  state = {
    characters: characters,
    chosenChars: [],
    topScore: 0,
    alertMessage: ""
  }

  handleChosen = event => {
    const name = event.target.attributes.getNamedItem("name").value;
    this.shuffleCharacters()
    this.checkGuess(name, this.updateTopScore)
  }

  shuffleCharacters = () => {
    this.setState(this.state.characters = this.shuffleArray(this.state.characters))
  }

  shuffleArray = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  checkGuess = (name, cb) => {
    const newState = { ...this.state };
    if (newState.chosenChars.includes(name)) {
      newState.alertMessage = `YOU ALREADY CHOSE "${name.toUpperCase()}"!`
      newState.chosenChars = []
      this.setState(this.state = newState)
    } else {
      newState.chosenChars.push(name)
      newState.alertMessage = `GOOD CHOICE!`
      this.setState(this.state = newState)
    }
    cb(newState, this.alertWinner)
  }

  updateTopScore = (newState, cb) => {
    if (newState.chosenChars.length > newState.topScore) {
      newState.topScore++
      this.setState(this.state = newState)
    }
    cb(newState)
  }

  alertWinner = (newState) => {
    if (newState.chosenChars.length === 12) {
      newState.alertMessage = "CHAMPION!";
      newState.chosenChars = [];
      this.setState(this.state = newState)
    }
  }

  render() {
    return (
      <div>
        <Nav style={{ background: "#313133", marginBottom: "5px" }} />

        <GridLayout container direction="column" style={{ margin: "0 auto", maxWidth: 945 }}>

          <GridLayout item lg={12}>
            <Paper>
              {this.state.alertMessage === "GOOD CHOICE!" ? (
                <Alerts message={this.state.alertMessage} style={{ color: "green" }} />
              ) : (
                  <Alerts message={this.state.alertMessage} style={{ color: "red" }} />
                )}
            </Paper>
          </GridLayout>

          <GridLayout container justify="space-between">

            <GridLayout item lg={6} md={6} sm={12} xs={12}>
              <Paper>
                <Score type="Score" score={this.state.chosenChars.length} />
              </Paper>
            </GridLayout>

            <GridLayout item lg={6} md={6} sm={12} xs={12}>
              <Paper>
                <Score type="Top Score" score={this.state.topScore} />
              </Paper>
            </GridLayout>

          </GridLayout>

        </GridLayout>

        <GridLayout container spacing={24} justify="center" style={{ maxWidth: 945, margin: "0 auto" }}>
          {this.state.characters.map(char => (
            <GridLayout item lg={3} md={3} sm={4} xs={6}>
            <CharacterCard
              id={char.id}
              name={char.name}
              image={char.image}
              key={char.id}
              handleChosen={this.handleChosen}
            />
            </GridLayout>
          ))}
        </GridLayout>

      </div>
    )
  }
}

export default App;