import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {

  const navigate= useNavigate();
  const [formdata, setFormdata] = useState({
    fullname:"",
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

const onSignup=async(e)=>{
  e.preventDefault();
  let newUrl = `${import.meta.env.VITE_API_URL}tuneshelf/users/signup`;
  const response= await axios.post(newUrl,formdata);
  if(response.data.success){
    console.log("User registered");
    toast.success("User registered successfully");
    navigate("/")
  }
  else{
    toast.error(response.data.message);
  }
}

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div>
          <form onSubmit={onSignup} className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
            <div className="flex flex-col items-center justify-center">
              <div className="card-body gap-2">
              <label className="label">
                  <span className="label-text">Name</span>{" "}
                </label>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Enter your fullname"
                  className="input"
                  value={formdata.fullname}
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
