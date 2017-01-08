const fs = require('fs');
const untildify = require('untildify');
const path = require('path');

module.exports = getMostRecentDownloadedFile = () => {
  const dlDir = untildify('~/Downloads');
  return fs
          .readdirSync(dlDir)
          .filter(file => file[0] !== '.') // no hidden files
          .map(file => ({
            absPath: path.resolve(dlDir, file),
            time: fs.statSync(path.resolve(dlDir, file)).mtime
          }))
          .sort((f1, f2) => f2.time - f1.time)
          [0].absPath;
}
