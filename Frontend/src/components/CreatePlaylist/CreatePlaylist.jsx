import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePlaylist = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState({
    title: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTitle({ ...title, [name]: value });
  };

  const onCreate = async (e) => {
    e.preventDefault();
    try {
      let newUrl = `${import.meta.env.VITE_API_URL}tuneshelf/playlist/create`;
      const response = await axios.post(newUrl, title, {
        withCredentials: true,
      });

      if (response.status === 201) {
        console.log("Playlist Created:", response.data);
        toast.success("Playlist created successfully");
        navigate("/playlists");
      } else {
        toast.error(response.data.message || "Failed to create playlist");
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while creating the playlist"
      );
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <form
          onSubmit={onCreate}
          className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box relative"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="card-body gap-2">
              <div className="flex justify-between w-full">
                <span className="label-text">Title</span>
                <button 
                  type="button" 
                  className="btn btn-sm btn-circle" 
                  onClick={() => navigate("/playlists")}
                >
                  ✕
                </button>
              </div>
              <input
                type="text"
                name="title"
                placeholder="Enter playlist name"
                className="input"
                value={title.title}
                onChange={handleChange}
              />
              <div className="mt-4 flex justify-center">
                <button type="submit" className="btn btn-soft btn-primary">
                  Create Playlist
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePlaylist;
