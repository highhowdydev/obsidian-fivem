import React from "react";

const getAppComponent = (app: string) => {
	switch (app) {
		case "test":
			return <h1>Hello</h1>;
		default:
			return null;
	}
};

export default getAppComponent;
