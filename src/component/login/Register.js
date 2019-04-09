import React, { Component } from "react";
import { Link } from "react-router-dom";
import { register } from "../UserFunctions";
import "./Register.css";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
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

    register(user).then(res => {
      if (res) {
        this.props.history.push("/login");
      }
    });
  };
  render() {
    return (
      <div className="login-page">
        <div className="form">
          <form className="register-form">
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
            <button onClick={e => this.onClick(e)}>create</button>
            <p className="message">
              Already registered? <Link to="/Login">Sign In</Link>
            </p>
            <p
              id="register-error"
              style={{
                color: "red",
                fontFamily: "inherit",
                marginTop: "25px",
                marginBottom: "0px",
                fontSize: "13px",
                display: "none"
              }}
            />
          </form>
        </div>
      </div>
    );
  }
}
