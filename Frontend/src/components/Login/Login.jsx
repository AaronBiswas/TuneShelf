import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext.jsx";

const Login = () => {

  const{login} = useContext(AuthContext);


  const navigate = useNavigate();
  const [logindata, setLogindata] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogindata({ ...logindata, [name]: value });
  };

  const onlogin = async (e) => {
    e.preventDefault();
    let newUrl = `${import.meta.env.VITE_API_URL}tuneshelf/users/login`;
    const response = await axios.post(newUrl, logindata);
    if (response.data.success) {
      console.log("User loggedin");
      toast.success(`Welcome ${logindata.username}`);
      login(response.data.token);
      navigate("/");
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-purple-300">
        <div>
          <form onSubmit={onlogin} className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
            <div className="card-body gap-2">
              <label className="label">
                <span className="label-text">Username</span>{" "}
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                className="input"
                value={logindata.username}
                onChange={handleChange}
              />
              <label className="label">
                <span className="label-text">Password</span>{" "}
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input"
                value={logindata.password}
                onChange={handleChange}
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button className="btn btn-soft btn-primary">Login</button>
            </div>
          </form>
          <div className="text-center mt-4">
            Sign up here!
            <Link to="/signup" className="link link-primary ml-1">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
