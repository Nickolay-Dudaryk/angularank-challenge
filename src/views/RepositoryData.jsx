import React from 'react';
import {Link} from "react-router-dom";

const RepositoryData = () => {
  return (
    <div>
      <h1>RepositoryData page</h1>
      <Link to="/">Back to main page</Link>
    </div>
  )
}

export default RepositoryData;

// TODO: show all contributors in current repo
// TODO: back to previous page not main page
