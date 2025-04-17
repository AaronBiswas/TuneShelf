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
    },

    songs: [SongSchema],

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// If you want to enforce uniqueness per user, add a compound index
PlaylistSchema.index({ title: 1, createdBy: 1 }, { unique: true });

const Playlist = mongoose.model("Playlist", PlaylistSchema);

export default Playlist;
