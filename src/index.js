import React from "react";
import ReactDOM from "react-dom";
import createHistory from "history/createBrowserHistory";
import thunk from "redux-thunk";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";

import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import { createLogger } from "redux-logger";

import api from "./middleware/api";
import App from "./App";
import rootReducer from "./reducers";

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

const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<MuiThemeProvider>
						<Component />
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

