export async function ReadTextFile(filePath: string): Promise<string> {
	const content:string = await Deno.readTextFile(filePath);

	return content;
}
