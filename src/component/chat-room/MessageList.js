import React, { Component } from "react";
import Message from "./Message";
import Receiver from "./Receiver";
import jwt from "jsonwebtoken";
import "./MessageList.css";

export default class MessageList extends Component {
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div className="chat">
        <h2>Cititech Chat Room</h2>
        <Receiver
          loadConversation={msgs => this.props.loadConversation(msgs)}
          getReceiver={receiver => this.props.getReceiver(receiver)}
        />
        <div className="message-list">
          {this.props.messages.map((message, index) => {
            return (
              <Message
                sender={
                  message.senderID ===
                  jwt.decode(localStorage.getItem("token")).username
                    ? index === this.props.messages.length - 1 && message.read
                      ? "me seen"
                      : "me"
                    : index === this.props.messages.length - 1 && message.read
                    ? "party seen"
                    : "party"
                }
                key={index}
                user={message.senderID}
                text={message.text}
              />
            );
          })}
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>
      </div>
    );
  }
}
