import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Card from "../Cards/Card.jsx";

const Sharedplaylist = () => {
  const navigate = useNavigate();
  const [sharedPlaylists, setSharedPlaylists] = useState([]);
  const [link, setLink] = useState("");

  const getSharedPlaylists = async () => {
    setSharedPlaylists([]);

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }tuneshelf/share/sharePlaylist/getSharedPlaylist`,
        { withCredentials: true }
      );

      setTimeout(() => {
        setSharedPlaylists(response.data.sharedPlaylists || []);
      }, 100);
    } catch (error) {
      console.log(error);
      toast.error("Error getting shared playlists");
    }
  };

  useEffect(() => {
    getSharedPlaylists();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-8">Shared Playlists</h1>
        {/* Share options */}
        <div className="flex w-full flex-col lg:flex-row gap-6 max-w-6xl mx-auto mt-8">
          <div className="card bg-base-300 rounded-box flex-1 p-6 flex items-center justify-center">
            <div className="card bg-base-100 w-full max-w-sm shadow-xl">
              <div className="card-body items-center text-center">
                <h2 className="card-title">Join a Playlist</h2>
                <div className="card-actions mt-4">
                  <button onClick={()=>navigate("/shared/joined")} className="btn btn-primary">Join Playlist</button>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-300 rounded-box flex-1 p-6 flex items-center justify-center">
            <div className="card bg-base-100 w-full max-w-sm shadow-xl">
              <div className="card-body items-center text-center">
                <h2 className="card-title">Share your playlists</h2>
                <div className="card-actions mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/shareoptions")}
                  >
                    Share playlist
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

export default Sharedplaylist;
