import express from "express";
import Auth from "../Middleware/Auth.js";
import { getProfile, loginUser, registerUser } from "../Controllers/User.controller.js";


const router = express.Router();


router.post("/signup",registerUser);
router.post("/login",loginUser);

router.get("/profile",Auth,getProfile)


export default router;