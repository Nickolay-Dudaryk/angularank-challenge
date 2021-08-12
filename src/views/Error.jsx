import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <h2>Error. Page not found</h2>
      <Link to="/">Go to main page</Link>
    </>
  );
};

export default Error;
