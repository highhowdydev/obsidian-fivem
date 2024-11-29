import { combineReducers } from "redux";
import root from "./reducers/root";

const reduxStore = combineReducers({ root });
export type RootState = ReturnType<typeof reduxStore>;

export { default as store } from "./store";
export default reduxStore;
