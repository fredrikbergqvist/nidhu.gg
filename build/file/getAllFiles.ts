export async function GetAllFiles(
	dir: string,
	fileList: string[] = [],
): Promise<string[]> {
	const files = Deno.readDirSync(dir);

	for (const file of files) {
		const filePath = `${dir}\\${file.name}`;
		if (file.isDirectory) {
			fileList = await GetAllFiles(filePath, fileList);
		} else {
				fileList.push(filePath);
		}
	}
	return fileList;
}
