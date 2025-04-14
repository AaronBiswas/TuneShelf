import express from "express";
import { AddSongs, createPlaylist } from "../Controllers/Playlist.controller.js";


const router = express.Router();


router.post("/playlists/create/",createPlaylist);
router.post("/playlists/:playlistId/add",AddSongs);


export default router;