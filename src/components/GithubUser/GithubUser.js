import React from "react";
import Paper from "material-ui/Paper";
import { translate } from "react-i18next";

import userStyles from "./githubUser.css";

const materialStyles = {
	card: {
		margin: "2em",
	},
};

const GithubUser = ({ t, user: { name, location } }) => (
	<Paper zDepth={1} style={materialStyles.card}>
		<ul className={userStyles.display}>
			<li>{t("GithubUser:name", { defaultValue: "Name" })}: {name}</li>
			<li>{t("GithubUser:location", { defaultValue: "Location" })}: {location}</li>
		</ul>
	</Paper>
);

export default translate(["GithubUser"])(GithubUser);
