import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../Cards/Card.jsx";
import { toast } from "react-toastify";

const ViewPlaylist = () => {
  const [playlist, setPlaylist] = useState([]);
  const getPlaylist = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}tuneshelf/playlist/view`,
        { withCredentials: true }
      );
      setPlaylist(response.data.playlists);
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
          playlist.map((item, index) => <Card item={item} key={index} refresh={getPlaylist} />)
        ) : (
          <div>No Playlists Found.</div>
        )}
      </div>
    </>
  );
};

export default ViewPlaylist;
