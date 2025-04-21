import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const JoinPlaylist = () => {
    const [playlist, setPlaylist] = useState([]);
  
    const getPlaylist = async () => {
      // First clear the playlist to ensure UI updates immediately
      setPlaylist([]);
      
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}tuneshelf/playlist/sharePlaylist/joinPlaylist/${localStorage.getItem("token")}`,
          { withCredentials: true }
        );
        // Short delay to ensure the UI has time to process the deletion
        setTimeout(() => {
          setPlaylist(response.data.sharedPlaylists || []);
        }, 100);
      } catch (error) {
        console.log(error);
        toast.error("Error getting your playlist");
      }
    };
  
    useEffect(() => {
      getPlaylist();
    }, []);
  
    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen">
          {playlist && playlist.length > 0 ? (
            playlist.map((item, index) => <Card item={item} key={item._id || index} refresh={getPlaylist} />)
          ) : (
            <div>No Playlists Found.</div>
          )}
        </div>
      </>
    );
}

export default JoinPlaylist