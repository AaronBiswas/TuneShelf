import express from "express";
import { AddSongs, createPlaylist, deletePlaylist, getPlaylist, getSinglePlaylist, RemoveSongs } from "../Controllers/Playlist.controller.js";
import Auth from "../Middleware/Auth.js";


const router = express.Router();


router.post("/create",Auth,createPlaylist);
router.post("/:playlistId/add",AddSongs);
router.post("/:playlistId/remove",RemoveSongs);
router.post("/:playlistId/delete",deletePlaylist);

router.get("/view",getPlaylist);
router.get('/:playlistId', getSinglePlaylist);



export default router;