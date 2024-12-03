import { fetchNui } from ".";
import store from "../store/store";

export function CloseApplication(application: string) {
	const state = store.getState();
	if (state.root.application !== application) return;

	store.dispatch({
		type: "root/setApplication",
		payload: "",
	});

	store.dispatch({ type: `${application}/cleanup` });

	fetchNui("nui:onCloseApplication", application);
}
