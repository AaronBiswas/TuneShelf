import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const PlaylistSongs = () => {
  const { playlistId } = useParams(); // Change from 'id' to 'playlistId' for consistency
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}tuneshelf/playlist/${playlistId}`,
          { withCredentials: true }
        );
        setPlaylist(res.data.playlist);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load playlist");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  if (loading) {
    return <div className="p-4 text-center">Loading playlist...</div>;
  }

  if (!playlist) {
    return <div className="p-4 text-center">Playlist not found.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="card bg-base-200 shadow-xl mb-8">
        <div className="card-body flex flex-row items-center gap-6">
          <div className="avatar">
            <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 bg-primary">
              <span className="text-4xl text-primary-content flex items-center justify-center w-full h-full">
                {playlist.title?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold">{playlist.title}</h1>
            <div className="mt-4 badge badge-primary badge-lg">
              {playlist.songs?.length || 0} song{playlist.songs?.length === 1 ? "" : "s"}
            </div>
          </div>
        </div>
      </div>

      {playlist.songs && playlist.songs.length > 0 ? (
        <div className="grid gap-4">
          {playlist.songs.map((song, index) => (
            <div key={index} className="card bg-base-100 hover:bg-base-200 transition-colors duration-200 shadow-lg">
              <div className="card-body flex flex-row items-center gap-4 p-4">
                <div className="avatar">
                  <div className="w-16 h-16 rounded-lg ring ring-secondary ring-offset-base-100 ring-offset-2 bg-secondary">
                    <span className="text-2xl text-secondary-content flex items-center justify-center w-full h-full">
                      {song.songname?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="card-title">{song.songname}</h2>
                  <p className="text-base-content/70">{song.artistname}</p>
                </div>
                {song.songlink && (
                  <a
                    href={song.songlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-outline gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Listen
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>No songs in this playlist yet. Add some songs to get started!</span>
        </div>
      )}
    </div>
  );
};

export default PlaylistSongs;
