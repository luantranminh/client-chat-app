import React, { Component } from "react";
import Autocomplete from "../Autocomplete";
import "./Receiver.css";

export default class Receiver extends Component {
  render() {
    return (
      <div>
        <Autocomplete
          loadConversation={msgs => this.props.loadConversation(msgs)}
          getReceiver={receiver => this.props.getReceiver(receiver)}
        />
      </div>
    );
  }
}
