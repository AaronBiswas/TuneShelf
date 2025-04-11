import React from "react";
import Signup from "../Signup/Signup.jsx";
import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Playlists from "../Playlists/Playlists.jsx";
import Sharedplaylist from "../Playlists/Sharedplaylist.jsx";

const Home = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Navbar />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/shared" element={<Sharedplaylist />} />
    </Routes>
    </>
  );
};

export default Home;
