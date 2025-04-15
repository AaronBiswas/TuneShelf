import React from "react";
import bgimage from "../../assets/cloud-forest-landscape.jpg"
import { useNavigate } from "react-router-dom";


const Mainpage = () => {

  const navigate=useNavigate();
  return (
    <>
      <div>
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: `url(${bgimage})`,
          }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Welcome to TuneShelf</h1>
              <p className="mb-5">
                Your personal music library in the cloud. Create custom playlists, 
                share your favorite tracks, and discover new music. 
                Organize your music collection the way you want it.
              </p>
              <button className="btn btn-primary" onClick={()=>navigate("/signup")}>Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mainpage;
