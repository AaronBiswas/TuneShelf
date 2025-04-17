import Playlist from "../models/Playlist.model.js";
import Share from "../models/Share.model.js";

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

    return res
      .status(201)
      .json({ message: "Playlist Shared!", savedShare: savedShare });
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

    return res.status(200).json({
      message: "New Playlist Shared!",
      SavedShare: SavedShare,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
