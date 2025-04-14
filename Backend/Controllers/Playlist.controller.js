import Playlist from "../models/Playlist.model.js";

export const createPlaylist = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const user = req.user;
    const newPlaylist = new Playlist({
      title: title,
      createdBy: user._id,
    });
    const savedPlaylist = await newPlaylist.save();

    return res.status(201).json(savedPlaylist);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const AddSongs = async(req,res)=>{

    const {songname,artistname,songlink}= req.body;
    
    if(!songname|| !artistname){
        return res.status(400).json({message:"Please enter the required song details"})
    }

    try {

        const playlist = await Playlist.findById()



        const newSong = {

        }
    } catch (error) {
        
    }
}