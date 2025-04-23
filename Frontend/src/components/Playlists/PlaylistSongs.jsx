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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{playlist.title}</h1>

      {playlist.songs && playlist.songs.length > 0 ? (
        <ul className="space-y-4">
          {playlist.songs.map((song, index) => (
            <li key={index} className="p-4 border rounded-xl shadow-sm">
              <div className="text-xl font-semibold">{song.songname}</div>
              <div className="text-sm text-gray-600">{song.artistname}</div>
              {song.songlink && (
                <a
                  href={song.songlink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline text-sm mt-1 inline-block"
                >
                  Listen
                </a>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500">No songs in this playlist.</div>
      )}
    </div>
  );
};

export default PlaylistSongs;
