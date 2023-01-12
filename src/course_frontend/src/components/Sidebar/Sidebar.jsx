import "./Sidebar.css";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div
          style={{
            padding: "1rem",
          }}
        >
          <Link to="/">
            <img
              src="https://cdn.pegasus.imarticus.org/images/imarticus-new-logo.svg"
              alt="logo"
            ></img>
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "flex-start",
          }}
        >
          <div
            style={{
              backgroundColor: "#022a22",
              borderLeft: "0.25rem solid #fff",
              fontWeight: 600,
              color: "#fefefe",
              padding: "1rem 2rem",
            }}
            className="tile"
          >
            Course
          </div>
          <a
            style={{ textDecoration: "none" }}
            href=""
            target="_blank"
            rel="noreferrer"
          >
            <div
              style={{
                fontWeight: 600,
                color: "#fefefe",
                padding: "1rem 2rem",
                borderLeft: "0.25rem solid transparent",
              }}
              className="tile"
            >
              Discussion
            </div>
          </a>
          
        </div>
        <div
          style={{
            position: "absolute",
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            bottom: "0px",
            padding: "1.5rem 0",
          }}
        >
          <hr style={{ width: "100%", color: "white" }} />
          <br />
          <div
            style={{
              fontFamily: "Source Sans Pro",
              textAlign: "left",
              color: "white",
            }}
          >
            Facing problems?
          </div>
          <br />
          <div>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: "white",
                fontSize: "1rem",
                fontFamily: "Source Sans Pro",
                fontWeight: 600,
                border: "none",
                borderRadius: "0.5rem",
                padding: ".75rem 2rem",
              }}
            >
              Get Help
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;