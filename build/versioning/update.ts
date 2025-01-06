import * as path from "https://deno.land/std@0.205.0/path/mod.ts";
import { ReadJsonFile } from "../file/readJsonFile.ts";

type ConfigWithVersion = {
	version: string;
};

const denoConfigFile = `${path.dirname(path.fromFileUrl(Deno.mainModule))}\\deno.json`;
const packageFile = `${path.dirname(path.fromFileUrl(Deno.mainModule))}\\package.json`;

export async function GetCurrentVersion() {
	const jsrFile = await ReadJsonFile<ConfigWithVersion>(denoConfigFile);
	const currentVersion = jsrFile.version.split(".");
	return currentVersion;
}

async function writeNewVersion(newVersion: string) {
	const jsrFile = await ReadJsonFile<ConfigWithVersion>(denoConfigFile);
	const npmConfig = await ReadJsonFile<ConfigWithVersion>(packageFile);
	jsrFile.version = newVersion;
	npmConfig.version = newVersion;
	console.log(`⚒️ Writing new version: ${newVersion} to deno.json and package.json`);
	Deno.writeTextFileSync(denoConfigFile, JSON.stringify(jsrFile));
	Deno.writeTextFileSync(packageFile, JSON.stringify(npmConfig));
}

export async function WriteMinorUpdate() {
	const currentVersion = await GetCurrentVersion();
	const currentMinor = currentVersion[1];
	const newMinor = parseInt(currentMinor) + 1;
	const newVersion = `${currentVersion[0]}.${newMinor}.0}`;
	return writeNewVersion(newVersion);
}

export async function WriteMajorUpdate() {
	const currentVersion = await GetCurrentVersion();
	const currentMajor = currentVersion[0];
	const newMajor = parseInt(currentMajor) + 1;
	const newVersion = `${newMajor}.0.0}`;
	return writeNewVersion(newVersion);
}

export async function writePatchUpdate() {
	const currentVersion = await GetCurrentVersion();
	const currentPatch = currentVersion[2];
	const newPatch = parseInt(currentPatch) + 1;
	const newVersion = `${currentVersion[0]}.${currentVersion[1]}.${newPatch}`;
	return writeNewVersion(newVersion);
}
