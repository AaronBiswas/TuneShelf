import express from 'express';
import Auth from '../Middleware/Auth.js';
import { getSharedPlaylist, shareExist, shareNew } from '../Controllers/Share.controller.js';


const router = express.Router();


router.get("/:playlistId/sharePlaylist",Auth,shareExist);
router.get("/sharePlaylist/getSharedPlaylist",Auth,getSharedPlaylist);
router.post("/:playlistId/sharePlaylist/New",Auth,shareNew);



export default router;