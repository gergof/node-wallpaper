import Wallpaper from '../Wallpaper';

import nativeModule from './module';

class MacWallpaper implements Wallpaper {
	get(): Promise<string> {
		if (!nativeModule) {
			return Promise.reject('Native module not found');
		}

		return Promise.resolve(
			decodeURIComponent(
				nativeModule.getWallpaperPath().replace('file://', '')
			)
		);
	}
	set(path: string): Promise<void> {
		return Promise.reject('Not implemented');
	}
}

export default MacWallpaper;
