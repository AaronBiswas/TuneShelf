import React from "react";
import Signup from "../Signup/Signup.jsx";
import { Route, Routes } from "react-router-dom";
import Login from "../Login/Login.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Playlists from "../Playlists/Playlists.jsx";
import Sharedplaylist from "../Playlists/Sharedplaylist.jsx";
import { ToastContainer } from "react-toastify";
import CreatePlaylist from "../CreatePlaylist/CreatePlaylist.jsx";
import ViewPlaylist from "../ViewPlaylist/ViewPlaylist.jsx";
import Mainpage from "../MainPage/Mainpage.jsx";
import GetProfile from "../GetProfile/GetProfile.jsx";
import ShareOptions from "../ShareOptions/ShareOptions.jsx";
import ShareNewPlaylist from "../ShareOptions/ShareNewPlaylist.jsx";
import JoinPlaylist from "../JoinPlaylist/JoinPlaylist.jsx";
import PlaylistSongs from "../Playlists/PlaylistSongs.jsx";

const Home = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<GetProfile />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlists/create" element={<CreatePlaylist />} />
        <Route path="/playlists/view" element={<ViewPlaylist />} />
        <Route path="/shared" element={<Sharedplaylist />} />
        <Route path="/shareoptions" element={<ShareOptions />} />
        <Route path="/shareoptions/new" element={<ShareNewPlaylist />} />
        <Route path="/shared/joined" element={<JoinPlaylist />} />
        <Route path="/playlist/:playlistId" element={<PlaylistSongs />} />
      </Routes>
    </>
  );
};

export default Home;
