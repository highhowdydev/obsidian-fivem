import { combineReducers } from "redux";
import root from "./reducers/root";
import characters from "./reducers/characters";
import chat from "./reducers/chat";

const reduxStore = combineReducers({ root, characters, chat });
export type RootState = ReturnType<typeof reduxStore>;

export { default as store } from "./store";
export default reduxStore;
