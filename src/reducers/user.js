import * as ActionTypes from "../actions";

// Updates error message to notify about the failed fetches.
const user = (state = null, action) => {
	const { type, error } = action;

	if (type === ActionTypes.USER_SUCCESS) {
		return { ...state, ...action.response };
	} else if (error) {
		return action.error;
	}

	return state;
};

export default user;
