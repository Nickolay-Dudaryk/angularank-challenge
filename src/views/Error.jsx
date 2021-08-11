import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <>
            <h2>Error. Page not found</h2>
            <Link to='/contributors'>Go back</Link>
        </>
    )
}

export default Error
