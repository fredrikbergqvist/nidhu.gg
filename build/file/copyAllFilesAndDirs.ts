import { outDir } from "../../build-dist.ts";
import { ReadTextFile } from "./readTextFile.ts";

export async function CopyAllFilesAndDirs(
	dir: string,
	fileList: string[] = [],
	subDir: string = "",
): Promise<string[]> {
	const files = Deno.readDirSync(dir);

	for (const file of files) {
		const filePath = `${dir}\\${file.name}`;
		if (file.isDirectory) {
			try{
				await	Deno.mkdir(`${outDir}\\${file.name}`);
			} catch (err) {
				if (!(err instanceof Deno.errors.AlreadyExists)) {
					throw err;
				}
			}

			fileList = await CopyAllFilesAndDirs(filePath, fileList, file.name);
		} else {
			const content = await ReadTextFile(filePath);
			const outPath = `${outDir}\\${subDir !== "" ? subDir+"\\" : ""}${file.name}`;
			Deno.writeTextFileSync(outPath, content);
		}
	}
	return fileList;
}
