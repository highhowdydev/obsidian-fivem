import { PrismaClient } from "@prisma/client";
export * from "@prisma/client";

export const db = new PrismaClient();

export async function establishConnection() {
	console.log("Establishing connection to database...");
	try {
		await db.$connect();
	} catch (error) {
		console.error("Error establishing connection to database:", error);
	}
}
