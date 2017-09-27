/* This file serves as a means of setting up fluent-ffmpeg with the correct path to ffmpeg. */

const fs = require('fs');
const path = require('path');

const ffmpeg = require('fluent-ffmpeg');

let osName = '';
let suffix = '';

switch (process.platform) {
  case 'win32':
    osName = 'windows';
    suffix = '.exe';
    break;
  case 'darwin':
    osName = 'macos';
    break;
  case 'linux':
    osName = 'linux';
    break;
  default:
    console.log('FATAL: Cannot determine OS for ffmpeg.');
    process.exit();
    break;
}

const directory = path.join('./vendor/ffmpeg', osName);

if (!fs.existsSync(directory)) {
  console.log(`FATAL: Cannot locate ffmpeg directory: ${directory}`);
  console.log(`FATAL: Create the above directory and put ffmpeg${suffix} and ffprobe${suffix} in it.`);
  process.exit();
} else {
  ffmpeg.setFfmpegPath(path.resolve(directory, 'ffmpeg' + suffix));
  ffmpeg.setFfprobePath(path.resolve(directory, 'ffprobe' + suffix));
}

module.exports = ffmpeg;
