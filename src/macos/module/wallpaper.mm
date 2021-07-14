#import <Foundation/Foundation.h>
#import <AppKit/AppKit.h>
#include "wallpaper.h"

std::string wallpaper::getWallpaperPath() {
	NSWorkspace* workspace = [NSWorkspace sharedWorkspace];
	NSScreen* mainScreen = [NSScreen mainScreen];

	NSURL* wallpaperUrl = [workspace desktopImageURLForScreen:mainScreen];

	NSNumber* isDirectory;
	[wallpaperUrl getResourceValue:&isDirectory forKey:NSURLIsDirectoryKey error:nil];

	NSString* wallpaperPath = @"";
	if([isDirectory boolValue]) {
		NSFileManager* fileManager = [NSFileManager defaultManager];
		NSArray<NSString*>* files = [fileManager contentsOfDirectoryAtPath:wallpaperUrl.path error:nil];
		NSArray<NSString*>* supportedExtensions = [NSArray arrayWithObjects:@"jpg", @"jpeg", @"png", nil];
		
		for(NSString* file in files) {
			NSString* extension = file.pathExtension;

			bool isImage = false;
			for(NSString* supportedExtension in supportedExtensions) {
				if([extension caseInsensitiveCompare:supportedExtension] == NSOrderedSame) {
					isImage = true;
					break;
				}
			}

			if(isImage) {
				NSURL* completeUrl = [wallpaperUrl URLByAppendingPathComponent:file];
				wallpaperPath = completeUrl.absoluteString;
				break;
			}
		}
	}
	else {
		wallpaperPath = wallpaperUrl.absoluteString;
	}

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
