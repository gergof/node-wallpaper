interface Module {
	getWallpaperPath(): string;
}

let addon: Module | undefined;
if (process.platform == 'win32') {
	addon = require('../../build/Release/wallpaper_module.node');
}

export default addon;
