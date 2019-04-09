import React, { Component } from "react";
import jwt from "jsonwebtoken";
import { Redirect } from "react-router-dom";

import "./SendMessageForm.css";

var truth = false;

export default class SendMessageForm extends Component {
  constructor() {
    super();
    this.state = {
      sender: "",
      message: ""
    };
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  handleFocus(e) {
    this.props.read();
  }

  handleSubmitMessage(e) {
    e.preventDefault();
    this.props.sendMessage({
      senderID: this.state.sender,
      text: this.state.message,
      read: false
    });

    document.getElementById("input-msg").value = "";
    document.getElementById("message-form").focus();

    this.setState({
      message: ""
    });
  }

  componentDidMount() {
    let username;
    try {
      username = jwt.decode(localStorage.getItem("token")).username;
    } catch (error) {
      truth = true;
    }

    this.setState({
      sender: username
    });
  }
  render() {
    return truth ? (
      <Redirect to="/login" />
    ) : (
      <form
        id="message-form"
        onSubmit={e => {
          this.handleSubmitMessage(e);
        }}
        className="send-message-form"
      >
        <input
          id="input-msg"
          onFocus={e => this.handleFocus(e)}
          onChange={e => this.handleChange(e)}
          placeholder="text here and hit ENTER "
          type="text"
        />
        <button>SEND</button>
      </form>
    );
  }
}
