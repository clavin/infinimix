const streamifier = require('streamifier');

const Completer = require('./Completer.js');
const ffmpeg = require('./setupFfmpeg.js');
const StreamBucket = require('./StreamBucket.js');

/**
 * Turns a song buffer into its PCM form.
 * @param {Buffer|Stream} songData - The raw song data as a buffer or a stream.
 * @returns {Promise<Object>} - The PCM and sample rate of the song.
 */
module.exports = function getPCMData(songData) {
  const pcmCompleter = new Completer();
  const sampleRateCompleter = new Completer();

  const pcmStream = new StreamBucket();

  // Fluent-ffmpeg requires a stream input, so make the data a stream if it's a buffer.
  if (!('readable' in songData))
    songData = streamifier.createReadStream(songData);

  // Forward the song to ffmpeg to handle the magics of converting to PCM.
  ffmpeg(songData)
    .noVideo()
    .format('s16be') // Tell ffmpeg the format we want is signed, 16-bit, and big-endian.
    .audioCodec('pcm_s16be')
    .audioChannels(2) // Enforce the data to be stereo.
    .on('codecData', (info) => {
      // Extract the sample rate from the info ffmpeg gives.
      // The second element of `audio_details` is usually "##### Hz".
      sampleRateCompleter.complete(parseInt(info.audio_details[1]));
    })
    .on('end', () => {
      const data = new Array(pcmStream.data.length / 2);

      // Convert all of the raw bytes to signed shorts, big endian order.
      for (let i = 0; i < data.length; i++)
        data[i] = (((pcmStream.data[i * 2] << 8) | pcmStream.data[i * 2 + 1]) << 16) >> 16;

      // Delete the data field of pcmStream to make **sure** the garbage collector knows to free the resources.
      delete pcmStream.data;

      pcmCompleter.complete(data);
    })
    .pipe(pcmStream);

  // Return a promise that ultimately resolves with an appropriate, semantic object.
  return Promise.all([pcmCompleter.promise, sampleRateCompleter.promise])
    .then((results) => ({
      pcm: results[0],
      sampleRate: results[1]
    }));
};
