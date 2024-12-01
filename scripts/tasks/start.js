import fs from "node:fs";
import path from "node:path";
import { writeFile, sanitizePath } from "../utils.js";

const startPath = sanitizePath(path.join(process.cwd(), "start.bat"));
const artifactsDir = sanitizePath(path.join(process.cwd(), "cfx"));
const rootDir = sanitizePath(process.cwd());

async function generateStartBatch() {
    try {
        let startBat = `cd /d "${rootDir}"\n`
        startBat += `"${artifactsDir}/FXServer.exe" +exec server.cfg`

        writeFile(startPath, startBat);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

generateStartBatch();
