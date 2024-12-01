import { db, establishConnection } from "./db";
import "./modules/characters";

establishConnection();

global.exports("db", () => db);

export { db };
