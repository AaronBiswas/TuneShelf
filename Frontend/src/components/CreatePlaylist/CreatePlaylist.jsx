import React from "react";

const CreatePlaylist = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <form onSubmit={} className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <div className="flex flex-col items-center justify-center">
            <div className="card-body gap-2">
              <label className="label">
                <span className="label-text">Title</span>{" "}
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter playlist name"
                className="input"
              />
              <div className="mt-4 flex justify-center">
              <button type="submit" className="btn btn-soft btn-primary">Create Playlist</button>
            </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePlaylist;
