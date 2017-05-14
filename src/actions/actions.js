import { CALL_API } from "../middleware/api";

export const USER_REQUEST = "USER_REQUEST";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAILURE = "USER_FAILURE";

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
export const fetchUser = login => ({
	[CALL_API]: {
		types: [USER_REQUEST, USER_SUCCESS, USER_FAILURE],
		endpoint: `users/${login}`,
	},
});

export const RESET_ERROR_MESSAGE = "RESET_ERROR_MESSAGE";

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
	type: RESET_ERROR_MESSAGE,
});
