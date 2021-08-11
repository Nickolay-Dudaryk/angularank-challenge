import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { fetchUserRepos } from '../Components/actions/repos';

const ContributorData = () => {
    const [repos, setRepos] = useState({});
    const params = useParams();
    const contributors = useSelector((state) => state.repos.contributors);
    const contributor = contributors.find(item => item.id === +params.id);
    
    // useEffect(() => {
    //     fetchUserRepos(contributor.login);
    //     setRepos()
    // }, []);


    return (
        <div>
            <h2>Repositories were {contributor.login} contributed</h2>
            <Link to="/contributors">Back to all contributors</Link>

            {/* <ul>
                {
                    repos.map(el => {
                        return <li>{el.name}</li>
                    })
                }
            </ul> */}
        </div>
    )
}

export default ContributorData;
