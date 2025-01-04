export async function ReadJsonFile<T = unknown>(filePath: string): Promise<T> {
	const content = await Deno.readTextFile(filePath);
	let json;
	try {
		json = JSON.parse(content);
	} catch (error) {
		console.error("😱 [ReadJsonFile]: Could not parse JSON", error);
	}
	return json;
}
