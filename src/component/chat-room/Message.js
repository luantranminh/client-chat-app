import React from "react";
import "./Message.css";

class Message extends React.Component {
  render() {
    return (
      <div className={"message " + this.props.sender}>
        <div />
        <div>{this.props.text}</div>
        <div className={"last " + this.props.sender}>seen</div>
      </div>
    );
  }
}

export default Message;
