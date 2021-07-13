import { commandExists, execFile } from '../util';

import {
	BackgroundManager,
	BackgroundManagerCapabilities
} from './BackgroundManager';

class Gconftool2 implements BackgroundManager {
	async isAvailable(): Promise<BackgroundManagerCapabilities[]> {
		if (await commandExists('gconftool-2')) {
			return [BackgroundManagerCapabilities.SET];
		}

		return [];
	}

	async set(imagePath: string): Promise<void> {
		await execFile('gconftool-2', [
			'--set',
			'/desktop/gnome/background/picture_filename',
			'--type',
			'string',
			imagePath
		]);
	}
}

export default Gconftool2;
