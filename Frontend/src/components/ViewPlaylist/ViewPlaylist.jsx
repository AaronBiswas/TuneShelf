import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ViewPlaylist = () => {

    const [playlist,setPlaylist]=useState([]);

    useEffect(()=>{
       const getPlaylist=async()=>{
        try {
            const response = await axios.get()
        } catch (error) {
            
        }
       }
    },[])



  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen">
        
    </div>
    </>
  )
}

export default ViewPlaylist