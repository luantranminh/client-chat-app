import axios from "axios";

const createMessage = msgInfo => {
  return axios
    .post(
      "http://localhost:8000/chats/" + msgInfo.receiver,
      { message: msgInfo.text },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

const getConversation = converstionInfo => {
  return axios
    .get("http://localhost:8000/chats/" + converstionInfo.receiver, {
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

const seen = receiver => {
  return axios
    .post("http://localhost:8000/chats/read/" + receiver, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then()
    .catch();
};

export { createMessage, getConversation, seen };
