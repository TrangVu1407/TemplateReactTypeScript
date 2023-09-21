import axios from "axios";

const login = {
  login: function (body) {
    return axios.post("/login", body);
  },
};

export default login;
