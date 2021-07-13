import { commandExists, execFile } from '../util';

import {
	BackgroundManager,
	BackgroundManagerCapabilities
} from './BackgroundManager';

class Pcmanfm implements BackgroundManager {
	async isAvailable(): Promise<BackgroundManagerCapabilities[]> {
		if (await commandExists('pcmanfm')) {
			return [BackgroundManagerCapabilities.SET];
		}

		return [];
	}

	async set(imagePath: string): Promise<void> {
		await execFile('pcmanfm', ['--set-wallpaper', imagePath]);
	}
}

export default Pcmanfm;
