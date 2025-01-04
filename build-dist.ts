import * as path from "https://deno.land/std@0.205.0/path/mod.ts";
import { CopyAllFilesAndDirs } from "./build/file/copyAllFilesAndDirs.ts";
import { GetAllFiles } from "./build/file/getAllFiles.ts";
import { ReadTextFile } from "./build/file/readTextFile.ts";
import { GetCurrentVersion, WriteMajorUpdate, WriteMinorUpdate, writePatchUpdate, } from "./build/versioning/update.ts";

export const inDir = `${
	path.dirname(path.fromFileUrl(Deno.mainModule))
}\\public\\script\\nidhugg`;
export const outDir = `${
	path.dirname(path.fromFileUrl(Deno.mainModule))
}\\dist`;

async function bundleAllJs() {
	const jsFiles = (await GetAllFiles(inDir))
		.filter((f) => f.endsWith(".js"));
	let concatenatedContent = `/**
* This module contains all Nidhugg web components in one bundle.
* @module
*/
`;
	await Promise.all(jsFiles.map(async (file) => {
		const result = await ReadTextFile(file);
		concatenatedContent += result + "\n";
		return;
	}));
	const outPath = `${outDir}\\index.js`;
	Deno.writeTextFileSync(outPath, concatenatedContent);
	console.log("📦 All components bundled");
}

async function copyAllComponentFolders() {
	const jsFiles = await CopyAllFilesAndDirs(inDir);
	await Promise.all(jsFiles.map(async (file: string) => {
		const result = await ReadTextFile(file);
		const outPath = `${outDir}\\${path.basename(file)}`;
		Deno.writeTextFileSync(outPath, result);
		return;
	}));
	console.log("📦 All components copied");
	return;
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

async function bundleAllCss(nidhuggCssContent: string = "") {
	const cssFiles = (await GetAllFiles(inDir))
		.filter((f) => f.endsWith(".css"));
	let concatenatedContent = nidhuggCssContent + "\n";
	await Promise.all(cssFiles.map(async (file) => {
		const result = await ReadTextFile(file);
		concatenatedContent += result + "\n";
		return;
	}));
	const outPath = `${outDir}\\nidhugg-bundle.css`;
	Deno.writeTextFileSync(outPath, concatenatedContent);
	console.log("📦 All css bundled");
}

async function copyCss() {
	const nidhuggCssContent = await ReadTextFile(
		`${
			path.dirname(path.fromFileUrl(Deno.mainModule))
		}\\public\\css\\nidhugg.css`,
	);
	const outPath = `${outDir}\\nidhugg.css`;
	Deno.writeTextFileSync(outPath, nidhuggCssContent);
	console.log("📦 nidhugg.css copied");
	return bundleAllCss(nidhuggCssContent);
}

try {
	await deleteDistFolder();
	await copyAllComponentFolders();
	await bundleAllJs();
	await copyCss();

	const currentVersion = await GetCurrentVersion();
	console.log("⚒️ Current version is ", currentVersion.join("."));
	const version = prompt(`⚒️ Enter version bump (M/m/p/enter to skip): `);

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
