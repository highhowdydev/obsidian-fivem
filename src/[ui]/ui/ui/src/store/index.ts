import { combineReducers } from "redux";
import root from "./reducers/root";
import characters from "./reducers/characters";
import chat from "./reducers/chat";
import handlingEditor from "./reducers/handling-editor";

const reduxStore = combineReducers({ root, characters, chat, handlingEditor });
export type RootState = ReturnType<typeof reduxStore>;

export { default as store } from "./store";
export default reduxStore;
