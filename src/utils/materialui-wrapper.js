import React from "react";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";

// Material UI requires us to wrap it with the theme
// see https://github.com/callemall/material-ui/issues/5330
// in our case we just extend the component object with stuff required by muiTheme
export default function MaterialUiComponent(Component) {
	class NewComponent extends Component {
		getChildContext() {
			return {
				muiTheme: getMuiTheme(lightBaseTheme),
			};
		}
	}
	NewComponent.childContextTypes = {
		muiTheme: React.PropTypes.object,
	};

	// return extended class
	return NewComponent;
}
