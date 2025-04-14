import mongoose from "mongoose";

const SongSchema = new mongoose.Schema(
  {
    songname: {
      type: String,
      required: true,
    },
    artistname: {
      type: String,
      required: true,
    },
    songlink: {
      type: String,
    },
  },
  { timestamps: true }
);

const PlaylistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    songs: [SongSchema],

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Playlist = mongoose.model("Playlist", PlaylistSchema);

export default Playlist;
