import React from "react";
import PageNotFoundImage from "../images/404-SVG-Animated-Page-Concept.png";
const PageNotFound = () => {
  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: " center",
      }}
    >
      <img
        src={PageNotFoundImage}
        alt="404"
        style={{
          minWidth: "300px",
        }}
      />
    </div>
  );
};

export default PageNotFound;
