import express from 'express';
import Auth from '../Middleware/Auth.js';
import { shareExist, shareNew } from '../Controllers/Share.controller.js';


const router = express.Router();


router.get("/:playlistId/sharePlaylist",Auth,shareExist);
router.post("/:playlistId/sharePlaylist/New",Auth,shareNew);



export default router;