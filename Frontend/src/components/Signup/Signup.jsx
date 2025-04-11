import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {

  const [formdata, setFormdata] = useState({
    name:"",
    username:"",
    email:"",
    password:"",
  })

  const handleChange = (e) => {
   const {name,value} = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("userdata",formdata);
  }


  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-purple-300">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center">
              <div className="card-body gap-2">
              <label className="label">
                  <span className="label-text">Name</span>{" "}
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your fullname"
                  className="input"
                  value={formdata.name}
                  onChange={handleChange}
                  
                />
                <label className="label">
                  <span className="label-text">Username</span>{" "}
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="input"
                  value={formdata.username}
                  onChange={handleChange}
                />
                <label className="label">
                  <span className="label-text">Email</span>{" "}
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input"
                  value={formdata.email}
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
                  value={formdata.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <button type="submit" className="btn btn-soft btn-primary">Sign Up</button>
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
