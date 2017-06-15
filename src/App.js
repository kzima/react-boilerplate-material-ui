import React from "react";
import { Route } from "react-router-dom";
import MainLayout from "./containers/MainLayout";
import Home from "./containers/Home";

export default () => (
	<MainLayout>
		<Route path="/" component={Home} />
	</MainLayout>
);

