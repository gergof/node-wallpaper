{
	"targets": [
		{
			"target_name": "wallpaper_module",
			"conditions": [
				["OS=='mac'", {
					"sources": [
						"src/macos/module/main.mm",
						"src/macos/module/wallpaper.mm"
					],
					"libraries": [
						"-framework Foundation",
						"-framework AppKit"
					]
				}],
				["OS=='win'", {
					"sources": [
						"src/win/module/main.cpp",
						"src/win/module/wallpaper.cpp"
					]
				}]
			],
			"include_dirs": [
				"<!@(node -p \"require('node-addon-api').include\")"
			],
			"libraries": [],
			"dependencies": [
				"<!(node -p \"require('node-addon-api').gyp\")"
			],
			"defines": ["NAPI_DISABLE_CPP_EXCEPTIONS"]
		}
	]
}
