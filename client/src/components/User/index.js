import React, { useState, useEffect } from "react";
import { UserState } from "../../context/Context";
import UserData from "../../service/userData";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
} from "react-bootstrap";

import "./index.css";

const Login = () => {
  const { user, setUser, userProfile, setUserProfile } = UserState();
  const navigate = useNavigate();

  const initialSignInState = {
    username: "",
    password: "",
  };
  const [signInState, setsignInState] = useState(initialSignInState);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setsignInState({ ...signInState, [name]: value });
    event.preventDefault();
  };

  const signIn = (event) => {
    UserData.signInUser(signInState)
      .then((response) => {
        setUser({
          id: response.data.user_info.id,
          username: response.data.user_info.username,
          role: response.data.user_info.role,
          accessToken: response.data.access,
        });
      })
      .then(() => navigate("/class"))
      .catch((e) => {
        alert("Incorrect Username or Password");
      });

    event.preventDefault();
  };

  return (
    <>
        <div className="singInForm">
          <div className=" w-25 mx-auto mt-5">
          <br/>
            <form className="form1">
              <br />
              <Form.Group className="mb-4 row">
                <Form.Label className="col-3">Username:</Form.Label>
                <Form.Control
                  id="username"
                  required
                  className="username col"
                  type="text"
                  placeholder="Enter Username"
                  onChange={handleInputChange}
                  name="username"
                  value={signInState.username}
                />
              </Form.Group>

              <Form.Group className="mb-4 row">
                <Form.Label className="col-3">Password:</Form.Label>
                <Form.Control
                  id="password"
                  required
                  className="password col"
                  type="password"
                  placeholder="Enter Password"
                  onChange={handleInputChange}
                  name="password"
                  value={signInState.password}
                />
              </Form.Group>
              <div className="submit" onClick={signIn} align="center">
                <Button variant="outline-danger" className="mb-4 w-100">Sign in</Button>
              </div>
              <div className="forgot" align="center">
                <u
                  className="text-dark mt-4"
                  onClick={() => {
                    navigate('/signup');
                  }}
                >
                  Don't have an account? Sign up!
                </u>
              </div><br/>
              <div className="forgot" align="center">
                <u
                  variant="light"
                  className="text-dark mt-4"
                  onClick={() => {
                    alert("Please contact admin to reset your password, call 800-521-1068");
                  }}
                >
                  Forgot Password?
                </u>
              </div>
            </form>
          </div>
        </div>
    </>
  );
};

export default Login;
