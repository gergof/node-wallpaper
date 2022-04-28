#include <windows.h>
#include "wallpaper.h"

std::u16string wallpaper::getWallpaperPath()
{
	wchar_t path[MAX_PATH];
	SystemParametersInfoW(SPI_GETDESKWALLPAPER, MAX_PATH, path, 0);

	std::wstring pathStr = path;
	std::u16string pathStr16(pathStr.begin(), pathStr.end());

	return pathStr16;
}

void wallpaper::setWallpaper(const Napi::CallbackInfo& info)
{
	Napi::Env env = info.Env();
	std::string path = info[0].ToString().Utf8Value();

	std::wstring pathStr = std::wstring(path.begin(), path.end());
	wchar_t* pathW = new wchar_t[pathStr.length() + 1];
	wcscpy_s(pathW, pathStr.length() + 1, pathStr.c_str());

	SystemParametersInfoW(SPI_SETDESKWALLPAPER, 0, pathW, SPIF_UPDATEINIFILE);
}

Napi::String wallpaper::_getWallpaperPath(const Napi::CallbackInfo &info)
{
	return Napi::String::New(info.Env(), wallpaper::getWallpaperPath());
}

Napi::Object wallpaper::Init(Napi::Env env, Napi::Object exports)
{
	exports.Set("getWallpaperPath", Napi::Function::New(env, wallpaper::_getWallpaperPath));
	exports.Set("setWallpaper", Napi::Function::New(env, wallpaper::setWallpaper));
	return exports;
}
