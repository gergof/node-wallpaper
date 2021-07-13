import path from 'path';
import os from 'os';

import { commandExists, execFile, readFile } from '../util';

import {
	BackgroundManager,
	BackgroundManagerCapabilities
} from './BackgroundManager';

class Nitrogen implements BackgroundManager {
	async isAvailable(): Promise<BackgroundManagerCapabilities[]> {
		if (await commandExists('nitrogen')) {
			return [
				BackgroundManagerCapabilities.GET,
				BackgroundManagerCapabilities.SET
			];
		}

		return [];
	}

	async get(): Promise<string> {
		const configFile = path.join(
			os.homedir(),
			'.config/nitrogen/bg-saved.cfg'
		);
		const config = await readFile(configFile, 'utf8');

		return (
			config
				.trim()
				.split('\n')
				.find(line => line.startsWith('file=')) || ''
		).replace('file=', '');
	}

	async set(imagePath: string): Promise<void> {
		await execFile('nitrogen', ['--set-zoom-fill', '--save', imagePath]);
	}
}

export default Nitrogen;
