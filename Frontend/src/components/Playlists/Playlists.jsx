import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Playlisticon from "../../assets/play-list_18874787.png";
import ViewIcon from "../../assets/search_8332845.png";
import Card from "../Cards/Card.jsx";

const Playlists = () => {
  const navigate = useNavigate();
  const [myPlaylists, setMyPlaylists] = useState([]);
  const [sharedPlaylists, setSharedPlaylists] = useState([]);
  const [activeTab, setActiveTab] = useState("create");

  const fetchPlaylists = async (url, setter, errorMessage) => {
    setter([]);
    try {
      const response = await axios.get(url, { withCredentials: true });
      // Set the playlists data, ensuring we handle both regular and shared playlists
      setter(response.data.playlists || response.data.sharedPlaylists || []);
    } catch (error) {
      console.log(error);
      toast.error(errorMessage);
    }
  };
  
  // Function to refresh all playlists data
  const refreshAllPlaylists = () => {
    if (activeTab === "view" || activeTab === "shared") {
      // Refresh the current tab's playlists
      if (activeTab === "view") {
        fetchPlaylists(
          `${import.meta.env.VITE_API_URL}tuneshelf/playlist/view`,
          setMyPlaylists,
          "Error getting your playlists"
        );
      } else {
        fetchPlaylists(
          `${import.meta.env.VITE_API_URL}tuneshelf/share/sharePlaylist/getSharedPlaylist`,
          setSharedPlaylists,
          "Error getting shared playlists"
        );
      }
    }
  };

  useEffect(() => {
    if (activeTab === "view") {
      fetchPlaylists(
        `${import.meta.env.VITE_API_URL}tuneshelf/playlist/view`,
        setMyPlaylists,
        "Error getting your playlists"
      );
    } else if (activeTab === "shared") {
      fetchPlaylists(
        `${import.meta.env.VITE_API_URL}tuneshelf/share/sharePlaylist/getSharedPlaylist`,
        setSharedPlaylists,
        "Error getting shared playlists"
      );
    }
  }, [activeTab]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-8">Your Music Collections</h1>
        
        {/* Tab navigation */}
        <div className="tabs tabs-boxed mb-6">
          <a 
            className={`tab ${activeTab === 'create' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            Create & Manage
          </a>
          <a 
            className={`tab ${activeTab === 'view' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('view')}
          >
            My Playlists
          </a>
          <a 
            className={`tab ${activeTab === 'shared' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('shared')}
          >
            Shared Playlists
          </a>
        </div>

        {/* Create & Manage Tab */}
        {activeTab === 'create' && (
          <div className="flex w-full flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
            <div className="card bg-base-300 rounded-box flex-1 p-6 flex items-center justify-center h-[500px]">
              <div className="card bg-base-100 w-full max-w-sm shadow-xl">
                <figure className="px-4 pt-4">
                  <img 
                    src={Playlisticon}
                    className="w-24 h-24 object-contain" 
                    alt="Create playlist"
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
                    alt="View playlists"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">Share your playlists</h2>
                  <p>
                    Share your music taste with friends and discover new music together.
                  </p>
                  <div className="card-actions mt-4">
                    <button className="btn btn-primary" onClick={() => navigate("/shareoptions")}>Share playlist</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* My Playlists Tab */}
        {activeTab === 'view' && (
          <div className="w-full max-w-6xl">
            {myPlaylists && myPlaylists.length > 0 ? (
              <div className="">
                {myPlaylists.map((item, index) => (
                  <div key={item._id || index} className="w-full">
                    <Card item={item} refresh={refreshAllPlaylists} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-base-200 rounded-lg">
                <p className="text-lg">No playlists found.</p>
                <p className="mt-2 text-sm opacity-70">
                  Create your first playlist to get started!
                </p>
                <button 
                  className="btn btn-primary mt-4" 
                  onClick={() => navigate("/playlists/create")}
                >
                  Create Playlist
                </button>
              </div>
            )}
          </div>
        )}

        {/* Shared Playlists Tab */}
        {activeTab === 'shared' && (
          <div className="w-full max-w-6xl">
            {sharedPlaylists && sharedPlaylists.length > 0 ? (
              <div className="">
                {sharedPlaylists.map((item, index) => (
                  <div key={item._id || index} className="w-full">
                    <Card item={{...item, isShared: true}} refresh={refreshAllPlaylists} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-base-200 rounded-lg">
                <p className="text-lg">No shared playlists found.</p>
                <p className="mt-2 text-sm opacity-70">
                  You can share your playlists with others or join playlists shared with you.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center mt-4">
                  <button 
                    className="btn btn-primary" 
                    onClick={() => navigate("/shareoptions")}
                  >
                    Share a Playlist
                  </button>
                  <button className="btn btn-secondary">
                    Join a Playlist
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Playlists;
