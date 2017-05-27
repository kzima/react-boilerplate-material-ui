import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";

import { storiesOf, addDecorator } from "@storybook/react";

import GithubUser from "../src/components/GithubUser";

injectTapEventPlugin();

// global Material Theme decorator
addDecorator(story => (
	<MuiThemeProvider>
		{story()}
	</MuiThemeProvider>
));

storiesOf("GithubUser", module)
	.add("with populated user", () => <GithubUser user={{ name: "Kris", location: "Brisbane" }} />);
