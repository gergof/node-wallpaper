import Wallpaper from '../Wallpaper';

import nativeModule from './module';

class MacWallpaper implements Wallpaper {
	get(): Promise<string> {
		if (!nativeModule) {
			return Promise.reject('Native module not found');
		}

		return Promise.resolve(nativeModule.getWallpaperPath());
	}
}

export default MacWallpaper;
