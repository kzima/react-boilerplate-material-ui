import React from "react";
import ReactDOM from "react-dom";
import createHistory from "history/createBrowserHistory";
import thunk from "redux-thunk";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import injectTapEventPlugin from "react-tap-event-plugin";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import { createLogger } from "redux-logger";
import { I18nextProvider } from "react-i18next"; // as we build ourself via webpack
import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from "material-ui/styles/colors";
import { fade } from "material-ui/utils/colorManipulator";
import spacing from "material-ui/styles/spacing";

import api from "./middleware/api";
import App from "./App";
import rootReducer from "./reducers";
import i18n from "./i18n"; // initialized i18next instance


import "./app.css";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const router = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducer,
	composeEnhancers(
		applyMiddleware(thunk, api, createLogger(), router),
	),
);


const nTheme = getMuiTheme({
	spacing,
	fontFamily: "Roboto, sans-serif",
	palette: {
		primary1Color: "#00d4aa",
		primary2Color: cyan700,
		primary3Color: grey400,
		accent1Color: pinkA200,
		accent2Color: grey100,
		accent3Color: grey500,
		textColor: darkBlack,
		alternateTextColor: white,
		canvasColor: white,
		borderColor: grey300,
		disabledColor: fade(darkBlack, 0.3),
		pickerHeaderColor: cyan500,
		clockCircleColor: fade(darkBlack, 0.07),
		shadowColor: fullBlack,
	},
});


const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<MuiThemeProvider muiTheme={nTheme}>
						<I18nextProvider i18n={i18n}>
							<Component />
						</I18nextProvider>
					</MuiThemeProvider>
				</ConnectedRouter>
			</Provider>
		</AppContainer>,
	document.getElementById("root"),
  );
};

render(App);

if (module.hot) {
	module.hot.accept("./reducers", () => {
		render(App);
	});
}

