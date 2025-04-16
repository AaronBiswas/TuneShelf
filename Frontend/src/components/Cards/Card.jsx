import axios from "axios";
import React, { useState } from "react";
import {toast} from "react-toastify";



const Card = ({ item,refresh }) => {
  const [songDetails, setsongDetails] = useState({
    songname: "",
    artistname: "",
    songlink: "",
  });

  const [onOpen, setonOpen] = useState(false);

  const handleChange=(e)=>{
    const { name, value } = e.target;
    setsongDetails({ ...songDetails, [name]: value });
  }

  const onAdd=async(e)=>{
    e.preventDefault();
    try {
      if (!item || !item._id) {
        toast.error("Invalid playlist ID");
        return;
      }
      
      let newUrl = `${import.meta.env.VITE_API_URL}tuneshelf/playlist/${item._id}/add`;
      const response = await axios.post(newUrl, songDetails, {
        withCredentials: true,
      });
      
      toast.success("Song added successfully");
      setsongDetails({ songname: "", artistname: "", songlink: "" });
      refresh();
    } catch (error) {
      console.log(error);
      toast.error("Cannot add Songs");
    }
  }

  const onRemove=async(e)=>{
    e.preventDefault();
    try {
      if (!item || !item._id) {
        toast.error("Invalid playlist ID");
        return;
      }

      let newUrl = `${import.meta.env.VITE_API_URL}tuneshelf/playlist/${item._id}/remove`;
      const response = await axios.post(newUrl, songDetails, {
        withCredentials: true,
      });

      const data = response.data;

      if (response.status===201) {
        toast.success(data.message || "Song removed successfully");
        setsongDetails({ songname: "", artistname: "", songlink: "" });
        refresh();
      } else {
        toast.error(data.message || "Failed to remove song");
      }
    } catch (error) {
      console.log(error);
      toast.error("Cannot remove Songs");
    }
  }

  return (
    <div className="card bg-base-100 shadow-xl mb-4">
      <div className="card-body">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3">
            <h2 className="card-title text-xl font-bold">{item.title}</h2>
            <p className="text-sm opacity-70 mt-1">
              {item.songs?.length || 0} songs in playlist
            </p>
          </div>
          <div className="md:w-2/3">
            {item.songs && item.songs.length > 0 ? (
              <ul className="list-disc pl-5">
                {item.songs.map((song, index) => (
                  <li key={index} className="mb-2">
                    <span className="font-medium">{song.songname}</span>
                    <p className="text-sm opacity-70">{song.artistname}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center opacity-70">
                No songs in this playlist.
              </div>
            )}
          </div>
          <button type="button"
            className="btn btn-soft btn-primary"
            onClick={() => setonOpen(!onOpen)}
          >
            Manage Songs
          </button>
          {onOpen && (
            <div className="mt-4 w-full">
              <div className="collapse bg-base-100 border-base-300 border rounded-lg">
                <input type="checkbox" defaultChecked />
                <div className="collapse-title font-semibold">Add Songs</div>
                <div className="collapse-content text-sm">
                  <form className="card-body gap-3 p-2">
                      <label className="label">
                        <span className="label-text">Song Title</span>
                      </label>
                      <input
                        type="text"
                        name="songname"
                        placeholder="Enter song title"
                        className="input input-bordered"
                        value={songDetails.songname}
                        onChange={handleChange}
                      />
                      <label className="label">
                        <span className="label-text">Song Artist</span>
                      </label>
                      <input
                        type="text"
                        name="artistname"
                        placeholder="Enter artist name"
                        className="input input-bordered"
                        value={songDetails.artistname}
                        onChange={handleChange}
                      />
                      <label className="label">
                        <span className="label-text">Song Link</span>
                      </label>
                      <input
                        type="url"
                        name="songlink"
                        placeholder="Enter song link"
                        className="input input-bordered"
                        value={songDetails.songlink}
                        onChange={handleChange}
                      />
                      <button type="button" onClick={onAdd} className="btn btn-soft btn-primary mt-3">
                        Add Song
                      </button>
                      <button type="button" onClick={onRemove} className="btn btn-soft btn-primary mt-3">
                        Remove Song
                      </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
