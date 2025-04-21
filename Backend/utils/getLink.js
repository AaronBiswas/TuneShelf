import jwt from "jsonwebtoken"
import Share from "../models/Share.model.js"

export const getLink = async (id, req, res) => {
  try {
    const decoded = jwt.verify(id, process.env.SHARED_SECRET);

    if (!decoded) {
      throw new Error("Invalid Link!");
    }

    // The token contains { userId: id } as per generateLink.js
    const sharedByUserId = decoded.userId;

    const playlists = await Share.find({ SharedBy: sharedByUserId });
    if (!playlists || playlists.length === 0) {
      throw new Error("No shared playlists found!");
    }
    
    return playlists;
  } catch (error) {
    console.log(error.message);
    if (res) {
      return res.status(500).json({ message: "Internal server error" });
    }
    throw error;
  }
}