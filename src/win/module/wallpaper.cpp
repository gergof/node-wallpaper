#include <windows.h>
#include "wallpaper.h"

std::u16string wallpaper::getWallpaperPath() {
	wchar_t path[MAX_PATH];
	SystemParametersInfoW(SPI_GETDESKWALLPAPER, MAX_PATH, path, 0);

	std::wstring pathStr = path;
	std::u16string pathStr16(pathStr.begin(), pathStr.end());

	return pathStr16;
}

Napi::String wallpaper::_getWallpaperPath(const Napi::CallbackInfo& info) {
	return Napi::String::New(info.Env(), wallpaper::getWallpaperPath());
}

Napi::Object wallpaper::Init(Napi::Env env, Napi::Object exports) {
	exports.Set("getWallpaperPath", Napi::Function::New(env, wallpaper::_getWallpaperPath));

	return exports;
}
