import { commandExists, execFile } from '../util';

import {
	BackgroundManager,
	BackgroundManagerCapabilities
} from './BackgroundManager';

class Gnome implements BackgroundManager {
	async isAvailable(): Promise<BackgroundManagerCapabilities[]> {
		if (await commandExists('gsettings')) {
			return [
				BackgroundManagerCapabilities.GET,
				BackgroundManagerCapabilities.SET
			];
		}

		return [];
	}

	async get(): Promise<string> {
		const { stdout } = await execFile('gsettings', [
			'get',
			'org.gnome.desktop.background',
			'picture-uri'
		]);

		return stdout.trim().slice(8, -1);
	}

	async set(imagePath: string): Promise<void> {
		await execFile('gsettings', [
			'set',
			'org.gnome.desktop.background',
			'picture-uri',
			`file://${imagePath}`
		]);
	}
}

export default Gnome;
