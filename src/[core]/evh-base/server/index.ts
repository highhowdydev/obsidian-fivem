import { db, establishConnection } from "./db";

establishConnection();

global.exports("db", () => db);

export { db };
