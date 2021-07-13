import { commandExists, execFile } from '../util';

import {
	BackgroundManager,
	BackgroundManagerCapabilities
} from './BackgroundManager';

class XfconfQuery implements BackgroundManager {
	async isAvailable(): Promise<BackgroundManagerCapabilities[]> {
		if (await commandExists('xfconf-query')) {
			return [BackgroundManagerCapabilities.SET];
		}

		return [];
	}

	async set(imagePath: string): Promise<void> {
		await execFile('xfconf-query', [
			'--channel',
			'xfce4-desktop',
			'--property',
			'/backdrop/screen0/monitor0/image-path',
			'--set',
			`${imagePath}`
		]);
	}
}

export default XfconfQuery;
