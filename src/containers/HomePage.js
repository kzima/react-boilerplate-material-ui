import React, { Component } from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";

import GithubUser from "../components/GithubUser";
import { fetchUser } from "../actions";

class HomePage extends Component {
	constructor() {
		super();

		this.state = {
			username: 1,
		};
	}

	changed = (event) => {
		this.setState({
			username: event.target.value,
		});
	}

	search = (event) => {
		this.props.fetchUser(this.state.username);
		event.preventDefault();
	}

	render() {
		const { t, user } = this.props;
		return (<form onSubmit={this.search}>
			{t("common:label", { defaultValue: "Github username" })} <input type="text" value={this.state.value} onChange={this.changed} /><button type="submit">Search</button>
			{user && <GithubUser user={user} />}
		</form>);
	}
}

const mapStateToProps = (state) => {
	const { user } = state;
	return {
		user,
	};
};

export default translate(["common"])(connect(mapStateToProps, {
	fetchUser,
})(HomePage));

