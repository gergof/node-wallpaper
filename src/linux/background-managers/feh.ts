import { commandExists, execFile } from '../util';

import {
	BackgroundManager,
	BackgroundManagerCapabilities
} from './BackgroundManager';

class Feh implements BackgroundManager {
	async isAvailable(): Promise<BackgroundManagerCapabilities[]> {
		if (await commandExists('feh')) {
			return [BackgroundManagerCapabilities.SET];
		}

		return [];
	}

	async set(imagePath: string): Promise<void> {
		await execFile('feh', ['--bg-fill', imagePath]);
	}
}

export default Feh;
