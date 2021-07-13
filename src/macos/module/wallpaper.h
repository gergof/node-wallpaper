#include <napi.h>

namespace wallpaper {
	std::string getWallpaperPath();
	Napi::String _getWallpaperPath(const Napi::CallbackInfo& info);

	Napi::Object Init(Napi::Env env, Napi::Object exports);
}
