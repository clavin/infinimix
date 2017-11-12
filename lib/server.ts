import express = require('express');
import * as path from 'path';

import config from './config';
import downloadFromUrl from './downloadFromUrl';
import downloadFromYouTube from './downloadFromYouTube';

/** The web application. Serves the static html page & bundle, and handles API requests. */
const app = express();

// Relay to the client any configuration variables important for functioning.
app.get('/api/config', (request, response) => {
    response.status(200).send({
        mediaProxying: config.mediaProxying
    }).end();
});

// Proxy media via URL due to CORS restrictions.
app.get('/api/url/:url', (request, response) => {
    if (!config.mediaProxying.URL.enabled) {
        // Don't want to be proxying willy-nilly.
        response.status(403).send('URL proxying disabled.').end();
        return;
    }
    if (typeof request.params.url !== 'string') {
        response.status(400).send('No URL specified.').end();
        return;
    }

    // Get a stream of data from the URL and pipe it to the client.
    downloadFromUrl(request.params.url)
        .then((stream) => {
            response.status(200);
            stream.pipe(response);
        })
        .catch((err) =>
            response.status(500).send(err instanceof Error ? err.message : err.toString()).end());
});

// Proxies the audio of a YouTube video due to CORS restrictions.
// NOTE: The input `id` *can* also be a url to the video. ytdl handles detecting the id for the given input.
app.get('/api/yt/:id', (request, response) => {
    if (!config.mediaProxying.YouTube.enabled) {
        response.status(403).send('YouTube proxying disabled.').end();
        return;
    }
    if (typeof request.params.id !== 'string') {
        response.status(400).send('No ID specified.').end();
        return;
    }

    downloadFromYouTube(request.params.id)
        .then(({ formatType, stream }) => {
            if (formatType !== undefined) {
                // Also proxy the format type if it's given to us.
                response.type(formatType);
            }

            response.status(200);
            stream.pipe(response);
        })
        .catch((err) =>
            response.status(500).send(err instanceof Error ? err.message : err.toString()).end());
});

// Serve the static public files in `public/`.
app.use(express.static('./public/'));

// Fallback all unknown URLs to index.html because routing is handled on the client.
app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// And now, we're off to the internets!
app.listen(config.port, (err: string | undefined) => {
    // tslint:disable:no-console
    if (err) {
        console.error(`Failed to start app:\n${err}`);
    } else {
        console.log(`Running on port ${config.port}!`);
    }
    // tslint:enable:no-console
});
