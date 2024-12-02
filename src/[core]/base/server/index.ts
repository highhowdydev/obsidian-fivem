import { db, establishConnection } from "./db";
import "./modules/characters";

import lib from "@overextended/ox_lib/server";
import { characters, GetUser } from "./modules/characters";

establishConnection();

lib.addCommand("characters", async function(source) {
    const user = await GetUser(String(source));
    TriggerClientEvent("base:sendCharacters", source, user);

}, {
    help: "Fetch characters",
    restricted: "group.admin",
})

global.exports("db", () => db);

export { db };
