interface Module {
	getWallpaperPath(): string;
	setWallpaper(path: string): void;
}

let addon: Module | undefined;
if (process.platform == 'win32') {
	addon = require('../../build/Release/wallpaper_module.node');
}

export default addon;
