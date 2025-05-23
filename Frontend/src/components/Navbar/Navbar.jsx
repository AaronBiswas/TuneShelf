import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext.jsx";

const Navbar = () => {
  const { authenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  const handleClick = () => {
    navigate("/");
  };

  // For debugging
  useEffect(() => {
    console.log("Auth State in Navbar:", authenticated);
  }, [authenticated]);

  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar bg-base-300 w-full">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2" onClick={handleClick}>
              TuneShelf
            </div>
            <div className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                {!authenticated ? (
                  <li>
                    <a href="/login">Login</a>
                  </li>
                ) : (
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                )}
                {authenticated && (
                  <li>
                    <a href="/profile">Profile</a>
                  </li>
                )}
                {authenticated && (
                  <li>
                    <a href="/playlists">Your Playlists</a>
                  </li>
                )}
                {authenticated && (
                  <li>
                    <a href="/shared">Shared Playlists</a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          {/* Page content here */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
