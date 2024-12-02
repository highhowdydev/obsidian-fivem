import Characters from "./apps/characters/characters";
import React from "react";

const getAppComponent = (app: string) => {
	switch (app) {
		case "characters":
			return <Characters />;
		default:
			return null;
	}
};

export default getAppComponent;
