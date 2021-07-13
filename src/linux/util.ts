import { promisify } from 'util';
import childProcess from 'child_process';
import fs from 'fs';

const execFile = promisify(childProcess.execFile);
const readFile = promisify(fs.readFile);

export const commandExists = async (cmd: string): Promise<boolean> => {
	try {
		let { stdout } = await execFile('which', ['-a', cmd]);
		stdout = stdout.trim();

		if (!stdout) {
			return false;
		}

		return true;
	} catch {
		return false;
	}
};

export const hasLine = (string: string, lineToFind: string): boolean => {
	return !!string.split('\n').find(line => line.trim() === lineToFind);
};

export { execFile, readFile };
