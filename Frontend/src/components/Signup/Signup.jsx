import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-purple-300">
        <div>
          <form>
            <div className="flex flex-col items-center justify-center">
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
                  <span className="label-text">Email</span>{" "}
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
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
            </div>
            <div className="mt-4 flex justify-center">
              <button className="btn btn-soft btn-primary">Sign Up</button>
            </div>
          </form>
          <div className="text-center mt-4">
            Already have an account?
            <Link to="/login" className="link link-primary ml-1">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
