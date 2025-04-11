import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-purple-300">
        <div>
          <form>
            <div className="card-body gap-2">
              <label className="label">
                <span className="label-text">Username</span>{" "}
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="input"
              />
              <label className="label">
                <span className="label-text">Password</span>{" "}
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button className="btn btn-soft btn-primary">Login</button>
            </div>
          </form>
          <div className="text-center mt-4">
            Sign up here!
            <Link to="/" className="link link-primary ml-1">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
