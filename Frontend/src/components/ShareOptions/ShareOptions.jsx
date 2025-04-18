import React from "react";
import { useNavigate } from "react-router-dom";

const ShareOptions = () => {
    const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-8">Share your music taste</h1>
        <div className="flex w-full flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
          <div className="card bg-base-300 rounded-box flex-1 p-6 flex items-center justify-center h-[500px]">
            <div className="card bg-base-100 w-full max-w-sm shadow-xl">
              <figure className="px-4 pt-4">
                <img src="" className="w-24 h-24 object-contain" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Share an existing playlist</h2>
                <div className="card-actions mt-4">
                  <button className="btn btn-primary" onClick={()=>navigate("/playlists/view")}>Share existing playlist</button>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-300 rounded-box flex-1 p-6 flex items-center justify-center h-[500px]">
            <div className="card bg-base-100 w-full max-w-sm shadow-xl">
              <figure className="px-4 pt-4">
                <img src="" className="w-24 h-24 object-contain" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Share a new playlists</h2>
                <div className="card-actions mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/shareoptions/new")}
                    >
                    Share a new playlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareOptions;
