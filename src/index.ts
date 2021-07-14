import LinuxWallpaper from './linux';
import WinWallpaper from './win';
import MacWallpaper from './macos';
import IWallpaper from './Wallpaper';
import { Factory } from './types';

const Managers: { [k: string]: Factory<IWallpaper> } = {
	linux: LinuxWallpaper,
	win32: WinWallpaper,
	darwin: MacWallpaper
};

class Wallpaper implements IWallpaper {
	private manager: IWallpaper | null = null;

	constructor() {
		if (Managers[process.platform]) {
			this.manager = new Managers[process.platform]();
		}
	}

	get(): Promise<string> {
		if (!this.manager) {
			return Promise.reject(
				new Error(
					'Unsupported platform. Supported platforms: linux, win32, darwin'
				)
			);
		}

		return this.manager.get();
	}
}

const wallpaper = new Wallpaper();

export default wallpaper;
export { Wallpaper };
