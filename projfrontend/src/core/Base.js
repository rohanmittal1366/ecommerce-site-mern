import React from "react";
import NavigationBar from "./NavigationBar";

const Base = ({
  title = "My Title",
  description = "My desrciption",
  className = "bg-dark text-white p-4",
  children,
}) => (
  <div>
    <NavigationBar />
    <div className="container-fluid">
      <div className=" py-2 bg-dark text-white text-center">
        <h2 className=" display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center py-2">
        <h4>If you got any questions, feel free to reach out!</h4>
        <button className="btn btn-warning ">Contact Us</button>
      </div>
      <div className="container">
        <span className="text-muted">
          An Amazing <span className="text-white">MERN</span> Bootcamp
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
