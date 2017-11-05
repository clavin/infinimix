import * as stream from 'stream';
import * as ytdl from 'ytdl-core';

import config from './config';

/** The result of calling `downloadFromYouTube`. */
interface IYouTubeDownloadResult {
    /** The stream of audio. */
    stream: stream.Readable;

    /** The `Content-Type` format of the audio. */
    formatType: string | undefined;
}

/** Downloads the audio of a video from YouTube. */
export default async function downloadFromYouTube(id: string): Promise<IYouTubeDownloadResult> {
    // Get the info about the video to do checks before we actually start proxying the data.
    const ytInfo = await ytdl.getInfo(id);

    if (!('length_seconds' in ytInfo)) {
        throw new Error('Cound not get length of video.');
    }
    if (config.mediaProxying.YouTube.timeLimit !== -1 &&
        parseInt(ytInfo.length_seconds, 10) > config.mediaProxying.YouTube.timeLimit) {
        throw new Error('Length of video exceeds time limit.');
    }

    // Choose the highest quality, audio-only format and pipe the stream back.
    const format = ytdl.chooseFormat(ytInfo.formats, { filter: 'audioonly' });

    // Unknown when this happens. Likely occurs when there is no audio-only format.
    if (format instanceof Error) {
        throw format;
    }

    // Return the stream that ytdl gets for the format chosen above.
    return {
        stream: ytdl.downloadFromInfo(ytInfo, { format }),
        formatType: format.type
    };
}
