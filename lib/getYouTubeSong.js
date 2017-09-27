const ytdl = require('ytdl-core');

/** The maximum allowed length of a video. */
const MaximumLength = 60 * 15;

/**
 * Gets information about and an audio stream for a YouTube video.
 * @param {string} ytId - The ID of a YouTube video of the song.
 * @returns {Promise<Object>} - The info, format, and a stream of the song.
 */
module.exports = function getYouTubeSong(ytId) {
  // Get info using ytdl (YouTube Download).
  return ytdl.getInfo(ytId)
    .then((info) => {
      if (info.length_seconds > MaximumLength)
        return Promise.reject('Length of video is too long.');

      // Choose a format.
      const format = ytdl.chooseFormat(info.formats, { filter: 'audioonly' });

      // Return the whole `info`, the chosen format, and the stream to the song.
      return {
        info: info,
        format: format,
        stream: ytdl.downloadFromInfo(info, { format: format })
      };
    });
};
