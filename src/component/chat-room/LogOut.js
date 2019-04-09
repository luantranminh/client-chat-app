import React, { Component } from "react";
import "./LogOut.css";

export default class LogOut extends Component {
  logout() {
    localStorage.removeItem("token");
  }
  render() {
    return (
      <div className="navigation">
        <a className="a button" onClick={this.logout} href="/login">
          <div class="logout">LOGOUT</div>
        </a>
      </div>
    );
  }
}
