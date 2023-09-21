import axios from "axios";

export interface PropsLogin {
  email: string;
  password: string;
}

const login = {
  login: function (body: PropsLogin) {
    return axios.post("/login", body);
  },
};

export default login;
