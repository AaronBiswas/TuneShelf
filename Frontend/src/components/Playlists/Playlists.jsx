import React from "react";
import { useNavigate } from "react-router-dom";
import Playlisticon from "../../assets/play-list_18874787.png";
import ViewIcon from "../../assets/search_8332845.png";

const Playlists = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-8">Your Music Collections</h1>
        <div className="flex w-full flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
          <div className="card bg-base-300 rounded-box flex-1 p-6 flex items-center justify-center h-[500px]">
            <div className="card bg-base-100 w-full max-w-sm shadow-xl">
              <figure className="px-4 pt-4">
                <img 
                  src={Playlisticon}
                  className="w-24 h-24 object-contain" 
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Create a Playlist</h2>
                <p>
                  Create your own custom playlist and add your favorite songs to enjoy anytime.
                </p>
                <div className="card-actions mt-4">
                  <button className="btn btn-primary" onClick={() => { navigate("/playlists/create") }}>Create your playlist</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card bg-base-300 rounded-box flex-1 p-6 flex items-center justify-center h-[500px]">
            <div className="card bg-base-100 w-full max-w-sm shadow-xl">
              <figure className="px-4 pt-4">
                <img 
                  src={ViewIcon}
                  className="w-24 h-24 object-contain"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">View your playlists</h2>
                <p>
                  Browse through all your created playlists and enjoy your music collection.
                </p>
                <div className="card-actions mt-4">
                  <button className="btn btn-primary" onClick={() => navigate("/playlists/view")}>View your playlists</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlists;
