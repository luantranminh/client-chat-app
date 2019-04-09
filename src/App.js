import React, { Component } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import DirectionURL from "./component/router/DirectionURL";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div id="chat-window" className="App">
          <DirectionURL />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
