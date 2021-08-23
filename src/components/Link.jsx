import React from "react";

const Link = ({ url, title }) => (
  <a href={url} target="_blank" rel="noreferrer">
    {title}
  </a>
);

export default Link;
