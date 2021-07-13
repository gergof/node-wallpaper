import { commandExists, execFile } from '../util';

import {
	BackgroundManager,
	BackgroundManagerCapabilities
} from './BackgroundManager';

class Dconf implements BackgroundManager {
	async isAvailable(): Promise<BackgroundManagerCapabilities[]> {
		if (await commandExists('dconf')) {
			return [
				BackgroundManagerCapabilities.GET,
				BackgroundManagerCapabilities.SET
			];
		}

		return [];
	}

	async get(): Promise<string> {
		const { stdout } = await execFile('dconf', [
			'read',
			'/org/mate/desktop/background/picture-filename'
		]);

		return stdout.trim().slice(1, -1);
	}

	async set(imagePath: string): Promise<void> {
		await execFile('dconf', [
			'write',
			'/org/mate/desktop/background/picture-filename',
			`"${imagePath}"`
		]);
	}
}

export default Dconf;
