import { combineReducers } from "redux";
import root from "./reducers/root";
import characters from "./reducers/characters";

const reduxStore = combineReducers({ root, characters });
export type RootState = ReturnType<typeof reduxStore>;

export { default as store } from "./store";
export default reduxStore;
