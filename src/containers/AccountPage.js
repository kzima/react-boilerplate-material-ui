import React from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
	return { state };
}

const AccountPage = () => (
	<div>
		Page 2!
	</div>
);

export default connect(mapStateToProps)(AccountPage);
