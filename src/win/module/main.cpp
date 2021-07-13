#include <napi.h>
#include "wallpaper.h"

Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
	return wallpaper::Init(env, exports);
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, InitAll);
