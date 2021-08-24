import React from "react";
import PropTypes from "prop-types";

const LinkBtn = ({ url, title }) => (
  <a href={url} target="_blank" rel="noreferrer">
    {title}
  </a>
);

LinkBtn.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default LinkBtn;
