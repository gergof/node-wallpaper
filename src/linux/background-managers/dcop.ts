import { commandExists, execFile } from '../util';

import {
	BackgroundManager,
	BackgroundManagerCapabilities
} from './BackgroundManager';

class Dcop implements BackgroundManager {
	async isAvailable(): Promise<BackgroundManagerCapabilities[]> {
		if (await commandExists('dcop')) {
			return [BackgroundManagerCapabilities.SET];
		}

		return [];
	}

	async set(imagePath: string): Promise<void> {
		await execFile('dcop', [
			'kdesktop',
			'KBackgroundIface',
			'setWallpaper',
			`${imagePath} 1`
		]);
	}
}

export default Dcop;
