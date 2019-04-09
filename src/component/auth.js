import jwt from "jsonwebtoken";

export var Auth = function() {
  try {
    const username = jwt.decode(localStorage.getItem("token")).username;
  } catch (error) {
    return false;
  }
  return true;
};
