import mongoose from "mongoose";
import connectdb from "../db/connectdb.js";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique:true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  playlists:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Playlists",
  }]
},{timestamps: true});


const User =mongoose.model("User",userSchema);

export default User;
