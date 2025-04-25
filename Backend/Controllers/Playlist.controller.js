import Playlist from "../models/Playlist.model.js";

export const createPlaylist = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const user = req.user;
    const newPlaylist = new Playlist({
      title: title,
      createdBy: user._id,
    });
    const savedPlaylist = await newPlaylist.save();

    return res.status(201).json(savedPlaylist);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const AddSongs = async (req, res) => {
  const { songname, artistname, songlink } = req.body;

  const { playlistId } = req.params;

  if (!songname || !artistname) {
    return res
      .status(400)
      .json({ message: "Please enter the required song details" });
  }

  try {
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(401).json({ message: "Playlist not found" });
    }

    const newSong = {
      songname: songname,
      artistname: artistname,
      songlink: songlink,
    };

    playlist.songs.push(newSong);

    const updatedPlaylist = await playlist.save();

    return res.status(201).json(updatedPlaylist);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const RemoveSongs = async (req, res) => {
  const { playlistId } = req.params;

  const { songname, artistname, songlink } = req.body;

  if (!songname && !artistname) {
    return res.status(404).json({ message: "Song doesn't exist" });
  }

  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist doesn't exist" });
    }

    if (playlist.songs.length === 0) {
      return res.status(400).json({ message: "Playlist is empty" });
    }

    const updatedSongs = playlist.songs.filter(
      (song) => !(song.songname == songname && song.artistname == artistname)
    );

    if (updatedSongs.length === playlist.songs.length) {
      return res
        .status(404)
        .json({ message: "Song not found in the playlist" });
    }

    playlist.songs = updatedSongs;

    const updatedPlaylist = await playlist.save();

    return res.status(201).json(updatedPlaylist);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in deleting song" });
  }
};

export const deletePlaylist = async (req, res) => {
  const { playlistId } = req.params;

  try {
    // First, delete the playlist
    const playlist = await Playlist.findByIdAndDelete(playlistId);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist doesn't exist" });
    }
    
    // Also delete any shared entries for this playlist
    try {
      // Import Share model if not already imported
      const Share = (await import("../models/Share.model.js")).default;
      await Share.deleteMany({ playlistId: playlistId });
      console.log("Related shared playlists also deleted");
    } catch (shareError) {
      console.log("Error deleting shared playlists:", shareError);
      // Continue execution even if there's an error with shared playlists
    }
    
    return res.status(200).json({ message: "Playlist deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPlaylist = async (req, res) => {
  const user= req.user;
  try {
    const playlist = await Playlist.find({createdBy: user._id });

    if (!playlist || playlist.length === 0) {
      return res.status(404).json({ message: "No Playlists available" });
    }

    const playlistData = playlist.map(playlists=>({
      _id: playlists._id,  // Include the _id field
      title: playlists.title,
      songs: playlists.songs,
    }))

    return res.status(200).json({playlists:playlistData});

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getSinglePlaylist = async (req, res) => {
  const { playlistId } = req.params;

  try {
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    return res.status(200).json({playlist:playlist});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};