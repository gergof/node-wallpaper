interface Wallpaper {
	get(): Promise<string>;
	set(path: string): Promise<void>;
}

export default Wallpaper;
