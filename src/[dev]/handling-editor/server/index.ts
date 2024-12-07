import { onClientCallback } from "@overextended/ox_lib/server";
import fs from "fs";
import * as path from "path";
import dayjs from "dayjs";
import chalk from "chalk";

type SaveRequest = {
	name: string;
	data: {
		vehicle: string;
		fields: JsonField[];
	};
};

type JsonField = {
	name: string;
	value: any;
};

onClientCallback("handling:saveJson", (playerId: number, data: SaveRequest) => {
    console.log(chalk.blue(`Saving handling data for ${data.data.vehicle}`));
	const fileDir = path.join(__dirname, "../exports", "json");
	if (!fs.existsSync(fileDir)) fs.mkdirSync(fileDir, { recursive: true });

	const filePath = path.join(__dirname, "../exports", "json", `${data.data.vehicle}.json`);

	if (fs.existsSync(filePath)) {
        const date = dayjs(Date.now()).format("YYMMDDHHmmss");
        const fileName = `${data.data.vehicle}-${date}.json`;
        console.log(chalk.yellow(`Existing file found for ${data.data.vehicle}, saving to /exports/json/backups/${fileName}`));
		const backupDir = path.join(__dirname, "../exports", "json", "backups");
		if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
		fs.renameSync(filePath, path.join(backupDir, fileName));
	}

	const jsonData = JSON.stringify(data.data, null, 2);

	fs.writeFileSync(filePath, jsonData);
    console.log(chalk.green(`Saved handling data for ${data.data.vehicle} as /exports/json/${data.data.vehicle}.json`));

	return true;
});

onClientCallback("handling:generateMetaFile", () => {
    const jsonDir = path.join(__dirname, "../exports", "json");
    const metaDir = path.join(__dirname, "../exports", "meta");

    if (!fs.existsSync(jsonDir)) return false;
    if (!fs.existsSync(metaDir)) fs.mkdirSync(metaDir, { recursive: true });

    let template = `<?xml version="1.0" encoding="UTF-8"?>\n<CHandlingDataMgr>\n\t<HandlingData>\n`;

    const files = fs.readdirSync(jsonDir);
    let fileCount;

    files.forEach(file => {
        if (fs.lstatSync(path.join(jsonDir, file)).isDirectory()) return;
        const data = JSON.parse(fs.readFileSync(path.join(jsonDir, file), "utf-8"));

        const vehicle = data.vehicle;
        const fields = data.fields;

        template += `\t\t<Item type="CHandlingData">\n\t\t\t<HandlingName>${vehicle}</HandlingName>\n`;

        fields.forEach((field: JsonField) => {
            const { name, value: fieldValue } = field;
            const value = Array.isArray(fieldValue)
                ? `x="${fieldValue[0]}" y="${fieldValue[1]}" z="${fieldValue[2]}"`
                : `value="${fieldValue}"`;
            template += `\t\t\t<${name} ${value} />\n`;
        });

        template += `\t\t</Item>\n`;

        fileCount++;
    });

    template += `\t</HandlingData>\n</CHandlingDataMgr>`;

    const metaFilePath = path.join(metaDir, "handling.meta");

    fs.writeFileSync(metaFilePath, template);
    console.log(chalk.green(`Generated meta file with ${fileCount} entries`));
    return true;
});
