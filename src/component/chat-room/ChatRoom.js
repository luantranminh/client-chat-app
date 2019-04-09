import React, { Component } from "react";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import LogOut from "./LogOut";
import { createMessage, getConversation } from "../ChatFunctions";
import jwt from "jsonwebtoken";
import io from "socket.io-client";

var socket = io("http://localhost:80");
let username;

export default class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiver: "",
      messages: []
    };

    socket = io("http://localhost:80", { forceNew: true });
    socket.on("my message", msg => {
      this.onMessageReceived(msg);
    });
    socket.on("read msg", data => {
      this.test(data);
    });
  }

  test(data) {
    getConversation({ receiver: this.state.receiver }).then(messages => {
      this.setState({
        messages: messages.map(({ sender, message, read }) => {
          return { senderID: sender, text: message, read: read };
        })
      });
    });
  }
  setRead() {
    getConversation({ receiver: this.state.receiver });
    socket.emit("reading", this.state.receiver);
  }

  onMessageReceived(msg) {
    this.setState({
      messages: [
        ...this.state.messages,
        { senderID: msg.sender, text: msg.text, read: false }
      ]
    });
  }

  componentDidMount() {
    try {
      username = jwt.decode(localStorage.getItem("token")).username;
    } catch (error) {
      username = "";
    }
    socket.emit("set user", username);
  }

  sendMessage(newMsg) {
    this.setState({
      messages: [...this.state.messages, newMsg]
    });

    createMessage({
      receiver: this.state.receiver,
      text: newMsg.text
    });

    socket.emit("send to user", this.state.receiver, username, newMsg.text);
  }

  loadConversation(messages) {
    this.setState({
      messages: messages
    });
  }

  updateReceiver(receiver) {
    this.setState({
      receiver: receiver
    });
  }

  render() {
    return (
      <React.Fragment>
        <LogOut />
        <MessageList
          messages={this.state.messages}
          loadConversation={msgs => this.loadConversation(msgs)}
          getReceiver={receiver => this.updateReceiver(receiver)}
        />
        <SendMessageForm
          sendMessage={msg => this.sendMessage(msg)}
          read={data => this.setRead()}
        />
      </React.Fragment>
    );
  }
}
