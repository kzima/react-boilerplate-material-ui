import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";

import { I18nextProvider } from "react-i18next"; // as we build ourself via webpack
import { storiesOf, addDecorator } from "@storybook/react";

import i18n from "../src/i18n"; // initialized i18next instance
import GithubUser from "../src/components/GithubUser";

injectTapEventPlugin();

// global Material Theme decorator
addDecorator(story => (
	<MuiThemeProvider>
		<I18nextProvider i18n={i18n}>
			{story()}
		</I18nextProvider>
	</MuiThemeProvider>
));

storiesOf("GithubUser", module)
	.add("with populated user", () => <GithubUser user={{ name: "Kris", location: "Brisbane" }} />);
