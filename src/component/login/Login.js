import React, { Component } from "react";
import { Link } from "react-router-dom";
import { login } from "../UserFunctions";
import "./Login.css";
import { Auth } from "../auth";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  componentWillMount() {
    if (Auth()) {
      this.props.history.push("/chat-room");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClick = e => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    };

    login(user).then(res => {
      if (res) {
        this.props.history.push("/chat-room");
      }
    });
  };
  render() {
    return (
      <div className="login-page">
        <div className="form">
          <form className="login-form">
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={e => this.onChange(e)}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={e => this.onChange(e)}
            />
            <button onClick={e => this.onClick(e)}>login</button>
            <p className="message">
              Not registered? <Link to="/Register">Create an account</Link>
            </p>
            <p
              id="login-error"
              style={{
                color: "red",
                fontFamily: "inherit",
                marginTop: "25px",
                marginBottom: "0px",
                fontSize: "13px"
              }}
            />
          </form>
        </div>
      </div>
    );
  }
}
