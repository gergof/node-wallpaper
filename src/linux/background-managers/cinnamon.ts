import { commandExists, execFile, hasLine } from '../util';

import {
	BackgroundManager,
	BackgroundManagerCapabilities
} from './BackgroundManager';

class Cinnamon implements BackgroundManager {
	async isAvailable(): Promise<BackgroundManagerCapabilities[]> {
		if (!(await commandExists('gsettings'))) {
			return [];
		}

		try {
			const { stdout } = await execFile('gsettings', ['list-schemas']);
			if (await hasLine(stdout, 'org.cinnamon.desktop.background')) {
				return [
					BackgroundManagerCapabilities.GET,
					BackgroundManagerCapabilities.SET
				];
			}
		} catch {
			// doing nothing
		}

		return [];
	}

	async get(): Promise<string> {
		const { stdout } = await execFile('gsettings', [
			'get',
			'org.cinnamon.desktop.background',
			'picture-uri'
		]);

		return stdout.trim().slice(8, -1);
	}

	async set(imagePath: string): Promise<void> {
		await execFile('gsettings', [
			'set',
			'org.cinnamon.desktop.background',
			'picture-uri',
			`file://${imagePath}`
		]);
	}
}

export default Cinnamon;
