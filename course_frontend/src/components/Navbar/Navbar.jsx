import "./Navbar.css";
import React from "react";


const Navbar = ({ title }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          boxShadow: "0 1px 10px -2px gray",
          backgroundColor: "white",
        }}
      >
        <div className="title">{title}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: "2rem",
          }}
        >
        <div style={{ marginTop: "0.5rem", marginRight: "0.5rem" ,}}>
            <button type="button" className="btn btn-primary btn-lg">
              <img
                src="https://learn.pegasus.imarticus.org/images/Support.svg"
                alt="Get-Help"
              />
              Get Help
            </button>
        </div>
          
        <div>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenu2"
                data-toggle="dropdown"
                aria-expanded="false"
                style={{
                  backgroundColor: "white",
                  border: "none",
                  marginTop: "0.5rem",
                }}
              >
                <img
                  src="https://cdn.eckovation.com/images/Profile-01.svg"
                  className="profileImage"
                  alt="profile"
                />
                <span className="username">User</span>
                <img
                  src="https://learn.pegasus.imarticus.org/images/downarrow.png"
                  style={{ marginLeft: "5px" }}
                  alt="arrow-sign"
                />
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li>
                  <button className="dropdown-item" type="button">
                    Edit profile
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;