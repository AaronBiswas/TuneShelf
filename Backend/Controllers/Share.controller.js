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
    // Get all shared playlists created by this user
    const sharedPlaylists = await Share.find({ SharedBy: sharedByUserId });

    if (!sharedPlaylists || sharedPlaylists.length === 0) {
      return res.status(404).json({ message: "No shared playlists found" });
    }

    // Filter out shared playlists whose referenced playlist no longer exists
    const validSharedPlaylists = [];
    
    for (const sharedPlaylist of sharedPlaylists) {
      // Check if the referenced playlist still exists
      const playlistExists = await Playlist.findById(sharedPlaylist.playlistId);
      
      if (playlistExists) {
        validSharedPlaylists.push(sharedPlaylist);
      } else {
        // If the playlist doesn't exist, delete the share entry
        await Share.findByIdAndDelete(sharedPlaylist._id);
        console.log(`Removed orphaned share entry for deleted playlist: ${sharedPlaylist._id}`);
      }
    }

    return res.status(200).json({ sharedPlaylists: validSharedPlaylists });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


export const joinLink = async (req, res) => {
  try {
    // Extract the token parameter from req.params
    const { token } = req.params;

    const {playlists,sharedByUserId} = await getLink(token);
    
    if (!playlists || playlists.length === 0) {
      return res.status(404).json({ message: "No shared playlists found" });
    }
    
    // Get the first playlist from the returned array
    const playlist = playlists[0];
    
    // Verify that the referenced playlist still exists
    const playlistExists = await Playlist.findById(playlist.playlistId);
    if (!playlistExists) {
      // If the playlist doesn't exist, delete the share entry
      await Share.findByIdAndDelete(playlist._id);
      return res.status(404).json({ message: "The shared playlist no longer exists" });
    }
    
    // Update the SharedWith field
    playlist.SharedWith = req.user._id;
    playlist.isAccepted = true;
    
    // Save the updated playlist
    const savedShare = await playlist.save();

    // Get valid shared playlists (filter out those with deleted playlists)
    const allSharedPlaylists = await Share.find({ SharedBy: sharedByUserId });
    const validSharedPlaylists = [];
    
    for (const sharedPlaylist of allSharedPlaylists) {
      const playlistStillExists = await Playlist.findById(sharedPlaylist.playlistId);
      if (playlistStillExists) {
        validSharedPlaylists.push(sharedPlaylist);
      } else {
        // Clean up orphaned share entries
        await Share.findByIdAndDelete(sharedPlaylist._id);
      }
    }

    if (validSharedPlaylists.length === 0) {
      return res.status(404).json({ message: "No valid shared playlists found" });
    }

    return res.status(200).json({
      message: "Playlist joined successfully!",
      SavedShare: savedShare,
      sharedPlaylists: validSharedPlaylists,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}