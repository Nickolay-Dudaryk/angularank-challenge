import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div>
            <h2>Error. Page not fount</h2>
            <Link to='/contributors'>Go back</Link>
        </div>
    )
}

export default Error
