import HandlingEditor from "./apps/handling-editor/handling-editor";
import Characters from "./apps/characters/characters";

const getAppComponent = (app: string) => {
	switch (app) {
		case "characters":
			return <Characters />;
		case "handling-editor":
			return <HandlingEditor />
		default:
			return null;
	}
};

export default getAppComponent;
