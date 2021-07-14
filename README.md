# node-wallpaper

[![Build Status](https://ci.systest.eu/api/badges/gergof/node-wallpaper/status.svg?ref=refs/heads/main)](https://ci.systest.eu/gergof/node-wallpaper)
[![NPM Version](https://img.shields.io/npm/v/node-wallpaper)](https://www.npmjs.com/package/node-wallpaper)
[![License](https://img.shields.io/npm/l/node-wallpaper)](https://www.gnu.org/licenses/gpl-3.0.html)
[![Typescript](https://img.shields.io/npm/types/node-wallpaper)](https://www.typescriptlang.org/)
[![Chat](https://img.shields.io/matrix/services:systemtest.tk)](https://matrix.to/#/#services:systemtest.tk)

Get wallpaper using nodejs and native addons.

Works on macOS, Linux and Windows.

### Install

```bash
npm install node-wallpaper
```

### Usage

```ts
import wallpaper from 'node-wallpaper';
// or:
// const wallpaper = require('node-wallpaper').default;

wallpaper.get().then(wallpaper => {
	console.log('The wallpaper is:', wallpaper);
});
```

### API

##### .get()

Returns a `Promise<string>` with the path of the current desktop wallpaper.

### Roadmap

[ ] Allow setting the wallpapers (only linux supports it so far)
