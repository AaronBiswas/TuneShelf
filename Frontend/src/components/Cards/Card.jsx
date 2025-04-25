import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Card = ({ item, refresh }) => {
  const [songDetails, setsongDetails] = useState({
    songname: "",
    artistname: "",
    songlink: "",
  });

  const navigate =useNavigate();

  const [onOpen, setonOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsongDetails({ ...songDetails, [name]: value });
  };

  const onAdd = async (e) => {
    e.preventDefault();
    try {
      if (!item || !item._id) {
        toast.error("Invalid playlist ID");
        return;
      }

      let newUrl = `${import.meta.env.VITE_API_URL}tuneshelf/playlist/${
        item._id
      }/add`;
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
  };

  const onRemove = async (e) => {
    e.preventDefault();
    try {
      if (!item || !item._id) {
        toast.error("Invalid playlist ID");
        return;
      }

      let newUrl = `${import.meta.env.VITE_API_URL}tuneshelf/playlist/${
        item._id
      }/remove`;
      const response = await axios.post(newUrl, songDetails, {
        withCredentials: true,
      });

      const data = response.data;

      if (response.status === 201) {
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
  };

  const onDeletePlaylist = async (e) => {
    e.preventDefault();
    try {
      if (!item || !item._id) {
        toast.error("Invalid playlist ID");
        return;
      }

      // For shared playlists, we need to delete the original playlist
      // The backend will automatically delete the shared entries
      let newUrl;
      if (item.isShared) {
        // For shared playlists, we need to use the playlistId field which references the original playlist
        // If playlistId is available, use it; otherwise fall back to _id
        const playlistIdToDelete = item.playlistId || item._id;
        newUrl = `${
          import.meta.env.VITE_API_URL
        }tuneshelf/playlist/${playlistIdToDelete}/delete`;
      } else {
        // Regular playlist deletion
        newUrl = `${import.meta.env.VITE_API_URL}tuneshelf/playlist/${
          item._id
        }/delete`;
      }

      const response = await axios.post(
        newUrl,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Playlist Deleted successfully");
        // Ensure refresh is called to update both regular and shared playlists
        if (typeof refresh === "function") {
          refresh();
        }
      } else {
        toast.error(response.data.message || "Failed to Delete the Playlist");
      }
    } catch (error) {
      console.log(error);
      toast.error("Cannot remove Playlist");
    }
  };

  const ViewSongs = async () => {
    if (item && item._id) {
      navigate(`/playlist/${item._id}`);
    } else {
      toast.error("Invalid playlist ID");
    }
  }

  const onShareExistingPlaylist = async (e) => {
    e.preventDefault();
    try {
      if (!item || !item._id) {
        toast.error("Invalid playlist ID");
        return;
      }

      let newUrl = `${import.meta.env.VITE_API_URL}tuneshelf/share/${
        item._id
      }/sharePlaylist`;
      const response = await axios.get(newUrl, { withCredentials: true });

      if (response.status === 201) {
        toast.success(response.data.message || "Playlist shared successfully");
        refresh();
      } else {
        toast.error(response.data.message || "Failed to share the Playlist");
      }
    } catch (error) {
      console.log(error);
      toast.error("Cannot share Playlist");
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl mb-4 hover:shadow-2xl transition-shadow duration-300">
      <div className="card-body p-5">
        {/* Card Header with Title and Song Count */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="card-title text-xl font-bold">{item.title}</h2>
            <p className="text-sm opacity-70 mt-1">
              {item.songs?.length || 0} songs in playlist
            </p>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-sm btn-circle btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a onClick={ViewSongs}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Songs
                </a>
              </li>
              <li>
                <a onClick={() => setonOpen(!onOpen)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Manage Songs
                </a>
              </li>
              <li>
                <a onClick={onDeletePlaylist} className="text-error">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Playlist
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Main Action Button - Share */}
        <div className="card-actions justify-end mt-2">
          <button
            className="btn btn-sm btn-primary"
            onClick={onShareExistingPlaylist}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share Playlist
          </button>
        </div>

          {onOpen && (
            <div className="mt-4 w-full">
              <div className="collapse collapse-arrow bg-base-200 border-base-300 border rounded-lg shadow-inner">
                <input type="checkbox" defaultChecked className="min-h-0" /> 
                <div className="collapse-title p-4 min-h-0 flex items-center">
                  <h3 className="font-semibold text-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    Manage Songs
                  </h3>
                </div>
                <div className="collapse-content p-4">
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control w-full md:col-span-2">
                      <label className="label">
                        <span className="label-text font-medium">Song Title</span>
                      </label>
                      <input
                        type="text"
                        name="songname"
                        placeholder="Enter song title"
                        className="input input-bordered w-full"
                        value={songDetails.songname}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-medium">Artist</span>
                      </label>
                      <input
                        type="text"
                        name="artistname"
                        placeholder="Enter artist name"
                        className="input input-bordered w-full"
                        value={songDetails.artistname}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text font-medium">Song Link</span>
                      </label>
                      <input
                        type="url"
                        name="songlink"
                        placeholder="Enter song link"
                        className="input input-bordered w-full"
                        value={songDetails.songlink}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="flex gap-2 md:col-span-2 mt-2">
                      <button
                        type="button"
                        onClick={onAdd}
                        className="btn btn-primary flex-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Song
                      </button>
                      <button
                        type="button"
                        onClick={onRemove}
                        className="btn btn-outline btn-error flex-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove Song
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

export default Card;
