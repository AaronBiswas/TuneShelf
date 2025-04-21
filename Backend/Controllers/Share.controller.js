import Playlist from "../models/Playlist.model.js";
import Share from "../models/Share.model.js";
import generateLink from "../utils/generateLink.js";
import { getLink } from "../utils/getLink.js";

export const shareExist = async (req, res) => {
  const { playlistId } = req.params;
  const sharedByUserId = req.user._id;
  

  try {
    const existPlaylist = await Playlist.findById(playlistId);

    if (!existPlaylist) {
      return res.status(401).json({ message: "Playlist not found" });
    }

    const SharedSongs = existPlaylist.songs.map((song) => ({
      songname: song.songname,
      artistname: song.artistname,
      songlink: song.songlink,
    }));

    const newShare = new Share({
      title: existPlaylist.title,
      SharedBy: sharedByUserId,
      playlistId: existPlaylist._id,
      songs: SharedSongs,
    });

    const savedShare = await newShare.save();

    const generatedLink = generateLink(sharedByUserId);

    return res
      .status(201)
      .json({ message: "Playlist Shared!", savedShare: savedShare,generatedLink: generatedLink });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const shareNew = async (req, res) => {
  const { title } = req.body;
  const sharedByUserId = req.user._id;
  
  try {
    const newPlaylist = new Playlist({
      title: title,
      createdBy: sharedByUserId,
    });
    const savedPlaylist = await newPlaylist.save();

    const newShare = new Share({
      title: newPlaylist.title,
      SharedBy: sharedByUserId,
      playlistId: savedPlaylist._id,
      songs: [],
    });

    const SavedShare = await newShare.save();

   const generatedLink = generateLink(sharedByUserId);


    return res.status(200).json({
      message: "New Playlist Shared!",
      SavedShare: SavedShare,
      generatedLink: generatedLink,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSharedPlaylist = async (req, res) => {
  const sharedByUserId = req.user._id;
  try {
    const sharedPlaylists = await Share.find({ SharedBy: sharedByUserId });

    if (!sharedPlaylists) {
      return res.status(404).json({ message: "No shared playlists found" });
    }

    return res.status(200).json({ sharedPlaylists });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


export const joinLink = async (req, res) => {
  try {
    // Extract the token parameter from req.params
    const { token } = req.params;

    const playlists = await getLink(token);
    
    if (!playlists || playlists.length === 0) {
      return res.status(404).json({ message: "No shared playlists found" });
    }
    
    // Get the first playlist from the returned array
    const playlist = playlists[0];
    
    // Update the SharedWith field
    playlist.SharedWith = req.user._id;
    playlist.isAccepted = true;
    
    // Save the updated playlist
    const savedShare = await playlist.save();

    const getPlaylistsfromLink = await Share.find({ SharedBy: sharedByUserId });

    if (!getPlaylistsfromLink) {
      return res.status(404).json({ message: "No shared playlists found" });
    }

    return res.status(200).json({
      message: "Playlist joined successfully!",
      SavedShare: savedShare,
      sharedPlaylists: getPlaylistsfromLink,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}