import axios from "axios";

const register = newUser => {
  return axios
    .post("http://localhost:8000/users/", {
      username: newUser.username,
      password: newUser.password
    })
    .then(res => {
      return res;
    })
    .catch(err => {
      document.getElementById("register-error").innerHTML =
        "" + err.response.data.error;
      document.getElementById("register-error").style.display = "block";
    });
};

const login = user => {
  return axios
    .post("http://localhost:8000/auth/", {
      username: user.username,
      password: user.password
    })
    .then(res => {
      localStorage.setItem("token", res.data.token);
      return res;
    })
    .catch(err => {
      document.getElementById("login-error").innerHTML =
        "" + err.response.data.error;
      document.getElementById("login-error").style.display = "block";
    });
};

const list = user => {
  return axios
    .get("http://localhost:8000/users/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export { register, login, list };
