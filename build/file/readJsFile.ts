export async function ReadJsFile(filePath: string): Promise<string> {
	const content:string = await Deno.readTextFile(filePath);

	return content;
}
