import { commandExists, execFile } from '../util';

import {
	BackgroundManager,
	BackgroundManagerCapabilities
} from './BackgroundManager';

class Setroot implements BackgroundManager {
	async isAvailable(): Promise<BackgroundManagerCapabilities[]> {
		if (await commandExists('setroot')) {
			return [BackgroundManagerCapabilities.SET];
		}

		return [];
	}

	async set(imagePath: string): Promise<void> {
		await execFile('setroot', [imagePath]);
	}
}

export default Setroot;
