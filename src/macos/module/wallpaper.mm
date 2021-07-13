#import <Foundation/Foundation.h>
#import <AppKit/AppKit.h>
#include "wallpaper.h"

std::string wallpaper::getWallpaperPath() {
	NSWorkspace* workspace = [NSWorkspace sharedWorkspace];
	NSScreen* mainScreen = [NSScreen mainScreen];

	NSURL* wallpaperUrl = [workspace desktopImageURLForScreen:mainScreen];
	NSString* wallpaperPath = wallpaperUrl.absoluteString;

	const char* path = [wallpaperPath UTF8String];
	std::string pathStr = path;

	return pathStr;
}

Napi::String wallpaper::_getWallpaperPath(const Napi::CallbackInfo& info) {
	return Napi::String::New(info.Env(), wallpaper::getWallpaperPath());
}

Napi::Object wallpaper::Init(Napi::Env env, Napi::Object exports) {
	exports.Set("getWallpaperPath", Napi::Function::New(env, wallpaper::_getWallpaperPath));

	return exports;
}
