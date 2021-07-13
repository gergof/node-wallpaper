import { commandExists, execFile, hasLine } from '../util';

import {
	BackgroundManager,
	BackgroundManagerCapabilities
} from './BackgroundManager';

class Mate implements BackgroundManager {
	async isAvailable(): Promise<BackgroundManagerCapabilities[]> {
		if (!(await commandExists('gsettings'))) {
			return [];
		}

		try {
			const { stdout } = await execFile('gsettings', ['list-schemas']);
			if (hasLine(stdout, 'org.mate.background')) {
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
			'org.mate.background',
			'picture-filename'
		]);

		return stdout.trim().slice(1, -1);
	}

	async set(imagePath: string): Promise<void> {
		await execFile('gsettings', [
			'set',
			'org.mate.background',
			'picture-filename',
			imagePath
		]);
	}
}

export default Mate;
