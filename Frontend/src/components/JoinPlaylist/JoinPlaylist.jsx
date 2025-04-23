import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Card from '../Cards/Card.jsx';

const JoinPlaylist = () => {
    const [playlist, setPlaylist] = useState([]);
    const [token, setToken] = useState('');
    const [isJoined, setIsJoined] = useState(false);
  
    const handleTokenChange = (e) => {
      const extractedToken = e.includes('token=') 
      ? e.split('token=')[1] 
      : e;
    setToken(extractedToken.trim());
    };

    const joinPlaylist = async (e) => {
      e.preventDefault();
      if (!token) {
        toast.error("Please enter a valid token");
        return;
      }

      // Clear the playlist to ensure UI updates immediately
      setPlaylist([]);
      
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}tuneshelf/share/sharePlaylist/joinPlaylist/${token}`,
          { withCredentials: true }
        );
        
        toast.success("Successfully joined the playlist!");
        setIsJoined(true);
        setPlaylist(response.data.sharedPlaylists || []);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Error joining the playlist");
      }
    };
  
    return (
      <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-bold mb-8">Join a Playlist</h1>
        
        {!isJoined ? (
        <div className="card bg-base-300 rounded-box p-6 max-w-md w-full">
          <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Enter Playlist Token or Link</h2>
            <form onSubmit={joinPlaylist}>
            <input
              type="text"
              placeholder="Paste the playlist token or link here"
              className="input input-bordered w-full mb-4"
              value={token}
              onChange={e => handleTokenChange(e.target.value)}
              onPaste={e => {
              const pasted = e.clipboardData.getData('text');
              handleTokenChange(pasted);
              e.preventDefault();
              }}
            />
            <button type="submit" className="btn btn-primary w-full">
              Join Playlist
            </button>
            </form>
          </div>
          </div>
        </div>
        ) : (
        <div className="w-full max-w-6xl">
          {playlist && playlist.length > 0 ? (
          playlist.map((item, index) => (
            <Card item={item} key={item._id || index} refresh={() => {}} />
          ))
          ) : (
          <div className="text-center p-8 bg-base-200 rounded-lg">
            <p className="text-lg">No playlists found with this token.</p>
          </div>
          )}
        </div>
        )}
      </div>
      </>
    );
}

export default JoinPlaylist