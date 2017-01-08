Display and control file download progress bar on macOS.
![screenshot](https://github.com/alexstrat/node-macos-download-progress/raw/master/.github/screenshot.png)

# Installation
:warning: _not published on npm yet_

```bash
$ npm install --save macos-download-progress
```

# Usage

Create a `MacOSDownloadProgress`, with `total`, telling the progress
bar when it will be considered complete. After that all we need to do is
`tick(amount)` appropriately.

```js
const MacOSDownloadProgress = require('macos-download-progress');
const FILE_PATH = '/path/to/file/you/want/to/display/progress-bar/on';

var progress = new MacOSDownloadProgress(FILE_PATH, {
  total: 1000
});

var timer = setInterval(() => {

  progress.tick(100);

  if (progress.completedCount > TOTAL) {
    console.log('Completed');
    clearInterval(timer);
  }
}, 1000);
```

Also, see [examples directory](https://github.com/alexstrat/node-macos-download-progress/master/.examples).

# API
_wip_

TODO: document the `cancellable` option and `cancel` event.

# Caveats and limitations
- no idea what happens when installed and used on other platforms than macOS
- have not tested on electron yet
- relies on [NodObjC](https://github.com/TooTallNate/NodObjC): slower than native binding? memory leaks?

# License
MIT
