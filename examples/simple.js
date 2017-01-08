const MacOSDownloadProgress = require('..');
const getMostRecentDownloadedFile = require('./utils/getMostRecentDownloadedFile');

const FILE_PATH = getMostRecentDownloadedFile();
const TOTAL = 1000;


var progress = new MacOSDownloadProgress(FILE_PATH, {
  total: TOTAL,
  cancellable: true,
});

console.log(`Starting progress on ${FILE_PATH}`);

var timer = setInterval(() => {

  progress.tick(100);

  if (progress.completedCount > TOTAL) {
    console.log('Completed');
    clearInterval(timer);
  }
}, 1000);

progress.on('cancel', () => {
  console.log('Canceled')
  clearInterval(timer);
});
