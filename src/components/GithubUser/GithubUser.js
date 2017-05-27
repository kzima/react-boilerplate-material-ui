import React from "react";
import Paper from "material-ui/Paper";

import userStyles from "./githubUser.css";

const materialStyles = {
	card: {
		margin: "2em",
	},
};

const GithubUser = (props) => {
	const { name, location } = props.user;
	return (
		<Paper zDepth={1} style={materialStyles.card}>
			<ul className={userStyles.display}>
				<li>Name: {name}</li>
				<li>Location: {location}</li>
			</ul>
		</Paper>
	);
};

export default GithubUser;
