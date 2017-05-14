import React from 'react';
import userStyles from './githubUser.css';

const GithubUser = (props) => {
    const {name, location} = props.user;
    return (
       <ul className={userStyles.display}>
          <li>Name: {name}</li>
          <li>Location: {location}</li>
      </ul>
    )
};

export default GithubUser;