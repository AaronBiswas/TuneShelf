import React from "react";
import Navbar from "../Navbar/Navbar";

const Playlists = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Navbar />
        <div className="flex w-full flex-col lg:flex-row">
          <div className="card bg-base-300 rounded-box grid h-screen grow place-items-center">
            Create a new playlist
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="card bg-base-300 rounded-box grid h-screen grow place-items-center">
            Join/share a playlist
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlists;
