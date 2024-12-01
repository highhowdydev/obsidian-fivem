export const GetIdentifiers = (src: string) => {
	const identifiers = {
		name: GetPlayerName(src),
		steam: " ",
		license: " ",
		discord: " ",
		fivem: " ",
		ip: GetPlayerEndpoint(src),
	};
	const idTotal = GetNumPlayerIdentifiers(src) - 1;
	for (let i = 0; i < idTotal; i++) {
		const id = GetPlayerIdentifier(src, i);
		if (id.substring(0, "steam:".length) == "steam:") {
			identifiers.steam = id.replace("steam:", "");
		} else if (id.substring(0, "license:".length) == "license:") {
			identifiers.license = id.replace("license:", "");
		} else if (id.substring(0, "discord:".length) == "discord:") {
			identifiers.discord = id.replace("discord:", "");
		} else if (id.substring(0, "fivem:".length) == "fivem:") {
			identifiers.fivem = id.replace("fivem:", "");
		}
	}
	return identifiers;
};
