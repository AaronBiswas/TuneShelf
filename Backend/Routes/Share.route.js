import express from 'express';
import Auth from '../Middleware/Auth.js';
import { deleteSharedPlaylist, getSharedPlaylist, joinLink, shareExist, shareNew } from '../Controllers/Share.controller.js';


const router = express.Router();


router.get("/:playlistId/sharePlaylist",Auth,shareExist);
router.get("/sharePlaylist/getSharedPlaylist",Auth,getSharedPlaylist);
router.get("/sharePlaylist/joinPlaylist/:token", Auth, joinLink);
router.post("/sharePlaylist/New",Auth,shareNew);
router.delete("/shared/:playlistId", Auth, deleteSharedPlaylist);



export default router;