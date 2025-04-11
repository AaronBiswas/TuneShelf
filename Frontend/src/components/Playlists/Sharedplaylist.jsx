import React from 'react'
import Navbar from '../Navbar/Navbar'

const Sharedplaylist = () => {
  return (
    <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="card bg-base-300 rounded-box grid h-screen w-screen grow place-items-center">
            Join/share a playlist
            </div>
        </div>
    </div>
  )
}

export default Sharedplaylist