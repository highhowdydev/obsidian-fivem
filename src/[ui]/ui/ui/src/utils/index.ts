// Check if the current environment is a browser
export const isEnvBrowser = (): boolean => !(window as any).invokeNative;

// No operation function
export const noop = () => {};

export async function fetchNui<T = unknown>(eventName: string, data?: unknown, mockData?: T): Promise<T> {
	try {
		const options = {
			method: "post",
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
			body: JSON.stringify(data),
		};

		if (isEnvBrowser() && mockData) return mockData;

		const resourceName = (window as any).GetParentResourceName ? (window as any).GetParentResourceName() : "ob-ui";

		const resp = await fetch(`https://${resourceName}/${eventName}`, options);

		const respFormatted = await resp.json();

		return respFormatted;
	} catch (error) {
		throw error;
	}
}
