import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
const Auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:"No token provided, please log in"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            return res.status(401).json({error:"User not found, please login again"});
        }
        req.user = user;
        console.log(user);
        next();


    } catch (error) {
        console.log("Authentication error:", error);
        return res.status(500).json({error:"Internal server error"});
    }
}


export default Auth;