import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
	return { state };
}

class AccountPage extends Component {
	constructor() {
		super();
	}

	render() {
		return (<div>
      Page 2!

    </div>);
	}
}

export default connect(mapStateToProps)(AccountPage);
