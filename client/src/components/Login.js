import React, {useState} from "react";
import axiosWithAuth from "../API/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [user, setUser] = useState({ username: "", password: "" });

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const login = event => {
    event.preventDefault();
    axiosWithAuth()
      .post(`http://localhost:5000/api/login`, user)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubbles");
      })
      .catch(error => console.log(error));
  };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form className="login" onSubmit={login}>
        <h2>Login Here</h2>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <button>Log in</button>
      </form>
    </>
  );
};

export default Login;
