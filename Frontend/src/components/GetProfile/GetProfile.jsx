import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const GetProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = `${
          import.meta.env.VITE_API_URL
        }tuneshelf/users/profile`;
        const response = await axios.get(userProfile,{
            withCredentials: true
          });
        if (response.status === 200) {
          console.log("User Profile obtained successfully", response.data.user);
          setProfile(response.data.user);
        }
      } catch (error) {
        console.log(error);
        toast.error("Unable to get user profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="card bg-base-300 rounded-box p-6 flex items-center justify-center max-w-md w-full">
          {loading ? (
            <div className="text-center p-4">
              <span className="loading loading-spinner loading-lg"></span>
              <p className="mt-2">Loading profile...</p>
            </div>
          ) : (
            <div className="card bg-base-100 w-full shadow-sm">
              <figure className="px-10 pt-10">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Profile"
                  className="rounded-xl w-32 h-32 object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-xl mb-2">Your Profile</h2>
                {profile ? (
                  <div className="space-y-2 w-full">
                    <p className="font-medium">Full Name: <span className="font-normal">{profile.fullname}</span></p>
                    <p className="font-medium">Username: <span className="font-normal">{profile.username}</span></p>
                    <p className="font-medium">Email: <span className="font-normal">{profile.email}</span></p>
                  </div>
                ) : (
                  <p>Profile not available</p>
                )}

                <div className="card-actions mt-4">
                  <button className="btn btn-primary">Edit</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GetProfile;
