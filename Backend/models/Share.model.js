import mongoose from "mongoose";

const sharedSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    SharedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    SharedWith: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    playlistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist",
        required: true
    },
    songs: [{
        songname: {
            type: String,
            required: true
        },
        artistname: {
            type: String,
            required: true
        },
        songlink: {
            type: String
        }
    }],
    sharedAt: {
        type: Date,
        default: Date.now
    },
    isAccepted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Share = mongoose.model("Share", sharedSchema);

export default Share;