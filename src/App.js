import React, { Component } from 'react';
import GridLayout from "./components/GridLayout";
import PaperLayout from "./components/PaperLayout";
import CharacterCard from "./components/CharacterCard";
import Score from "./components/Score";
import Alert from "./components/Alert";
import NavBar from "./components/NavBar";
import characters from "./characters.json";

class App extends Component {

  state = {
    characters: characters,
    pickedChars: [],
    topScore: 0,
    alertMessage: ""
  }

  handlePicked = event => {

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
    if (newState.pickedChars.includes(name)) {
      newState.alertMessage = `YOU ALREADY PICKED "${name.toUpperCase()}"!`
      newState.pickedChars = []
      this.setState(this.state = newState)
    } else {
      newState.pickedChars.push(name)
      newState.alertMessage = `GOOD CHOICE!`
      this.setState(this.state = newState)
    }
    cb(newState, this.alertWinner)
  }

  updateTopScore = (newState, cb) => {
    if (newState.pickedChars.length > newState.topScore) {
      newState.topScore++
      this.setState(this.state = newState)
    }
    cb(newState)
  }

  alertWinner = (newState) => {
    if (newState.pickedChars.length === 12) {
      newState.alertMessage = "CHAMPION!";
      newState.pickedChars = [];
      this.setState(this.state = newState)
    }
  }

  render() {
    return (
      <div>
        <NavBar style={{ background: "#313133", marginBottom: "5px" }} />

        <GridLayout container direction="column" style={{ margin: "0 auto", maxWidth: 945 }}>

          <GridLayout item lg={12}>
            <PaperLayout>
              {this.state.alertMessage === "GOOD CHOICE!" ? (
                <Alert message={this.state.alertMessage} style={{ color: "green" }} />
              ) : (
                  <Alert message={this.state.alertMessage} style={{ color: "red" }} />
                )}
            </PaperLayout>
          </GridLayout>

          <GridLayout container justify="space-between">

            <GridLayout item lg={6} md={6} sm={12} xs={12}>
              <PaperLayout>
                <Score type="Score" score={this.state.pickedChars.length} />
              </PaperLayout>
            </GridLayout>

            <GridLayout item lg={6} md={6} sm={12} xs={12}>
              <PaperLayout>
                <Score type="Top Score" score={this.state.topScore} />
              </PaperLayout>
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
              handlePicked={this.handlePicked}
            />
            </GridLayout>
          ))}
        </GridLayout>

      </div>
    )
  }
}

export default App;