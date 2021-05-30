import axios from "axios";

const AuthService = () => {
    const loginHandler = (data) => {
        axios
          .post(`${process.env.API_URL}/login`, {
            username: data.email,
            password: data.password,
          })
          .then((user) => {
            console.log(user.headers.authorization);
            console.log(user);
          })
          .catch((err) => {
            console.log(err);
          });
      };
}

export default AuthService;