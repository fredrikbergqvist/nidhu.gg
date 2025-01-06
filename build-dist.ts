import * as path from "https://deno.land/std@0.205.0/path/mod.ts";
import { minify } from "npm:minify";
import { CopyAllFilesAndDirs } from "./build/file/copyAllFilesAndDirs.ts";
import { GetAllFiles } from "./build/file/getAllFiles.ts";
import { ReadTextFile } from "./build/file/readTextFile.ts";
import { GetCurrentVersion, WriteMajorUpdate, WriteMinorUpdate, writePatchUpdate } from "./build/versioning/update.ts";

const minifyOptions = {
	js: {
		type: "putout",
		putout: {
			quote: "'",
			mangle: true,
			mangleClassNames: true,
			removeUnusedVariables: true,
			removeConsole: false,
			removeUselessSpread: true,
		},
	},
	css: {
		type: "clean-css",
		"clean-css": {
			compatibility: "*",
		},
	},
};

export const inDir = `${path.dirname(path.fromFileUrl(Deno.mainModule))}\\public\\script\\nidhugg`;
export const outDir = `${path.dirname(path.fromFileUrl(Deno.mainModule))}\\dist`;

async function getAllTextContent(files: string[]) {
	let concatenatedContent = ``;
	await Promise.all(
		files.map(async (file) => {
			const result = await ReadTextFile(file);
			concatenatedContent += result + "\n";
			return;
		})
	);
	return concatenatedContent;
}

async function bundleAllJs() {
	const files = await GetAllFiles(inDir);
	const jsFiles = files.filter((f) => f.endsWith(".js"));
	const tsFiles = files.filter((f) => f.endsWith(".ts"));
	let concatenatedJs = await getAllTextContent(jsFiles);

	const jsBundleOutPath = `${outDir}\\index.js`;
	Deno.writeTextFileSync(jsBundleOutPath, concatenatedJs);
	const minifiedJsBundle = await minify(jsBundleOutPath, minifyOptions);
	console.log("📦 All component JS bundled");
	const minJsBundleOutPath = `${outDir}\\index.min.js`;
	Deno.writeTextFileSync(minJsBundleOutPath, minifiedJsBundle);
	console.log("📦 JS bundle minified");

	let concatenatedTs = await getAllTextContent(tsFiles);
	const tsBundleOutPath = `${outDir}\\index.ts`;
	Deno.writeTextFileSync(tsBundleOutPath, concatenatedTs);
	console.log("📦 All component TS bundled");
}

async function copyAllComponentFolders() {
	const jsFiles = await CopyAllFilesAndDirs(inDir);
	await Promise.all(
		jsFiles.map(async (file: string) => {
			const result = await ReadTextFile(file);
			const outPath = `${outDir}\\${path.basename(file)}`;
			Deno.writeTextFileSync(outPath, result);
			return;
		})
	);
	console.log("📦 All component JS copied");
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
	const cssFiles = (await GetAllFiles(inDir)).filter((f) => f.endsWith(".css"));
	let concatenatedContent = nidhuggCssContent + "\n";
	await Promise.all(
		cssFiles.map(async (file) => {
			const result = await ReadTextFile(file);
			concatenatedContent += result + "\n";
			return;
		})
	);

	const bundleOutPath = `${outDir}\\bundle.css`;
	Deno.writeTextFileSync(bundleOutPath, concatenatedContent);
	const minifiedBundle = await minify(bundleOutPath, minifyOptions);
	console.log("📦 All css bundled");

	const minBundleOutPath = `${outDir}\\bundle.min.css`;
	Deno.writeTextFileSync(minBundleOutPath, minifiedBundle);
	console.log("📦 CSS bundle minified");
}

async function copyCss() {
	const nidhuggCssContent = await ReadTextFile(`${path.dirname(path.fromFileUrl(Deno.mainModule))}\\public\\css\\nidhugg.css`);
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
