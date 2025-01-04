import * as path from "https://deno.land/std@0.205.0/path/mod.ts";
import { CopyAllFilesAndDirs } from "./build/file/copyAllFilesAndDirs.ts";
import { GetAllFiles } from "./build/file/getAllFiles.ts";
import { ReadJsFile } from "./build/file/readJsFile.ts";
import { ReadJsonFile } from "./build/file/readJsonFile.ts";

export const inDir = `${
	path.dirname(path.fromFileUrl(Deno.mainModule))
}\\public\\script\\nidhugg`;
export const outDir = `${
	path.dirname(path.fromFileUrl(Deno.mainModule))
}\\dist`;

const jsrConfigFile = `${
	path.dirname(path.fromFileUrl(Deno.mainModule))
}\\jsr.json`;
const packageFile = `${
	path.dirname(path.fromFileUrl(Deno.mainModule))
}\\package.json`;

async function bundleAllComponents() {
	const jsFiles = await GetAllFiles(inDir);
	let concatenatedContent = "";
	await Promise.all(jsFiles.map(async (file) => {
		const result = await ReadJsFile(file);
		concatenatedContent += result + "\n";
		return;
	}));
	const outPath = `${outDir}\\index.js`;
	Deno.writeTextFileSync(outPath, concatenatedContent);
	console.log("📦 All components bundled");
}

async function copyAllComponentFolders() {
	const jsFiles = await CopyAllFilesAndDirs(inDir);
	await Promise.all(jsFiles.map(async (file: any) => {
		const result = await ReadJsFile(file);
		const outPath = `${outDir}\\${path.basename(file)}`;
		Deno.writeTextFileSync(outPath, result);
		return;
	}));
	console.log("📦 All components copied");
}

async function deleteDistFolder() {
	const files = Deno.readDirSync(outDir);
	for (const file of files) {
		const filePath = `${outDir}\\${file.name}`;
		try {
			if (file.isDirectory) {
				await Deno.remove(filePath, { recursive: true });
			} else {
				await Deno.remove(filePath);
			}
		} catch (e) {
			console.error(e);
		}
	}
	console.log("🗑️ Dist-folder deleted");
}
type ConfigWithVersion = {
	version: string;
};

async function getCurrentVersion() {
	const jsrFile = await ReadJsonFile<ConfigWithVersion>(jsrConfigFile);
	const currentVersion = jsrFile.version.split(".");
	return currentVersion;
}
async function writeNewVersion(newVersion: string) {
	const jsrFile = await ReadJsonFile<ConfigWithVersion>(jsrConfigFile);
	const npmConfig = await ReadJsonFile<ConfigWithVersion>(packageFile);
	jsrFile.version = newVersion;
	npmConfig.version = newVersion;
	console.log(
		`⚒️ Writing new version: ${newVersion} to jsr.json and package.json`,
	);
	Deno.writeTextFileSync(jsrConfigFile, JSON.stringify(jsrFile));
	Deno.writeTextFileSync(packageFile, JSON.stringify(npmConfig));
}

async function WriteMinorUpdate() {
	const currentVersion = await getCurrentVersion();
	const currentMinor = currentVersion[1];
	const newMinor = parseInt(currentMinor) + 1;
	const newVersion = `${currentVersion[0]}.${newMinor}.${currentVersion[2]}`;
	return writeNewVersion(newVersion);
}

async function WriteMajorUpdate() {
	const currentVersion = await getCurrentVersion();
	const currentMajor = currentVersion[0];
	const newMajor = parseInt(currentMajor) + 1;
	const newVersion = `${newMajor}.${currentVersion[1]}.${currentVersion[2]}`;
	return writeNewVersion(newVersion);
}

async function writePatchUpdate() {
	const currentVersion = await getCurrentVersion();
	const currentPatch = currentVersion[2];
	const newPatch = parseInt(currentPatch) + 1;
	const newVersion = `${currentVersion[0]}.${currentVersion[1]}.${newPatch}`;
	return writeNewVersion(newVersion);
}

try {
	await deleteDistFolder();
	await copyAllComponentFolders();
	await bundleAllComponents();

	const version = prompt("Enter version bump (M/m/p): ");

	if (version === "m") {
		await WriteMinorUpdate();
	}
	if (version === "M") {
		await WriteMajorUpdate();
	}
	if (version === "p") {
		await writePatchUpdate();
	}
	if (version === "") {
		console.log("🦕: No version bump");
	}
} catch (e) {
	console.error(e);
}
