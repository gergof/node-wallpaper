import Wallpaper from '../Wallpaper';

import backgroundManagers from './background-managers';
import {
	BackgroundManager,
	BackgroundManagerCapabilities
} from './background-managers/BackgroundManager';

class LinuxWallpaper implements Wallpaper {
	private availableBMGetters: BackgroundManager[] | null = null;
	private availableBMSetters: BackgroundManager[] | null = null;

	private async queryAvailableBMs(): Promise<void> {
		this.availableBMGetters = [];
		this.availableBMSetters = [];

		const promises = backgroundManagers.map(bm => {
			return bm.isAvailable().then(capabilities => {
				if (capabilities.includes(BackgroundManagerCapabilities.GET)) {
					this.availableBMGetters?.push(bm);
				}

				if (capabilities.includes(BackgroundManagerCapabilities.SET)) {
					this.availableBMSetters?.push(bm);
				}
			});
		});

		await Promise.all(promises);
	}

	async get(): Promise<string> {
		if (this.availableBMGetters === null) {
			await this.queryAvailableBMs();
		}

		if (!this.availableBMGetters) {
			return '';
		}

		const wallpaperCount = new Map<string, number>();

		const promises = this.availableBMGetters.map(bm => {
			if (!bm.get) {
				return Promise.resolve();
			}

			return bm
				.get()
				.then(wallpaper => {
					if (wallpaper) {
						wallpaperCount.set(
							wallpaper,
							(wallpaperCount.get(wallpaper) ?? 0) + 1
						);
					}
				})
				.catch(() => {
					// doing nothing
				});
		});

		await Promise.all(promises);

		const mostVotedVallapper = Array.from(wallpaperCount.entries()).reduce(
			(acc, [wallpaper, count]) => {
				if (count > acc[1]) {
					return [wallpaper, count];
				}

				return acc;
			},
			['', 0]
		);

		return mostVotedVallapper[0];
	}

	set(path: string): Promise<void> {
		return Promise.reject('Not implemented');
	}
}

export default LinuxWallpaper;
