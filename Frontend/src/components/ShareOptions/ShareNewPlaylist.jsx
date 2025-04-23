import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ShareNewPlaylist = () => {
    const navigate = useNavigate();
    
      const [title, setTitle] = useState({
        title: "",
      });
      // Add state to store the generated link
      const [generatedLink, setGeneratedLink] = useState("");
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setTitle({ ...title, [name]: value });
      };
    
      // Function to copy link to clipboard
      const onLinkShare = async () => {
        if (generatedLink) {
          try {
        await navigator.clipboard.writeText(generatedLink);
        toast.success("Link copied to clipboard!");
          } catch (err) {
        console.error("Failed to copy link: ", err);
        toast.error("Failed to copy link to clipboard");
          }
        } else {
          toast.error("No link available to copy");
        }
      };
    
      const onCreate = async (e) => {
        e.preventDefault();
        try {
          let newUrl = `${import.meta.env.VITE_API_URL}tuneshelf/share/sharePlaylist/new`;
          const response = await axios.post(newUrl, title, {
            withCredentials: true,
          });
    
          if (response.status === 200) {
            console.log("New Playlist Shared:", response.data.generatedLink);
            // Store the generated link in state
            setGeneratedLink(response.data.generatedLink);
            toast.success("New playlist ready to share!");
            // Don't navigate away immediately so user can see and copy the link
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
              
              {!generatedLink ? (
                <div className="mt-4 flex justify-center">
                  <button type="submit" className="btn btn-soft btn-primary">
                    Create a new Shared Playlist
                  </button>
                </div>
              ) : (
                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={generatedLink} 
                      readOnly 
                      className="input input-bordered flex-1 cursor-text" 
                    />
                    <button 
                      type="button" 
                      onClick={onLinkShare} 
                      className="btn btn-primary"
                    >
                      Copy Link
                    </button>
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-outline" 
                    onClick={() => navigate("/playlists")}
                  >
                    Go to Playlists
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShareNewPlaylist;
