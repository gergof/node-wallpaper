export enum BackgroundManagerCapabilities {
	GET,
	SET
}

export interface BackgroundManager {
	isAvailable(): Promise<BackgroundManagerCapabilities[]>;
	get?(): Promise<string>;
	set?(imagePath: string): Promise<void>;
}
