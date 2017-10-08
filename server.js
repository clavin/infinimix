const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const ytdl = require('ytdl-core');

/** Whether the server is running in development mode. */
const isDevelopment = process.env.NODE_ENV === 'development';

/** The maximum allowed length of a video. */
const MaxYouTubeLength = 60 * 15;

/** The port to run the express `app` on. */
const Port = process.env.PORT || 8080;
const app = express();

// Publish everything in the `public/` directory.
app.use(express.static('./public'));

// Add the development middleware if we're running in dev mode.
if (isDevelopment) {
  const webpackConfig = require('./webpack.config.js');

  // Make sure the entrypoint is an array.
  if (!Array.isArray(webpackConfig.entry))
    webpackConfig.entry = [webpackConfig.entry];

  // Put hot reloading entrypoints into config.
  webpackConfig.entry.splice(
    webpackConfig.entry.length - 1,
    0,
    'react-hot-loader/patch'
  );
  webpackConfig.entry.splice(
    webpackConfig.entry.length - 1,
    0,
    'webpack-hot-middleware/client'
  );

  const webpackCompiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(webpackCompiler, webpackConfig.devServer));
  app.use(webpackHotMiddleware(webpackCompiler));
}

// Proxy the song with the given id to the client (same-origin policy restricts this on the client).
app.get('/api/yt/song/:id', (req, res) => {
  ytdl.getInfo(req.params.id)
    .then((info) => {
      if (info.length_seconds > MaxYouTubeLength)
        return Promise.reject(new Error(`Length of video exceeds ${MaxYouTubeLength} seconds; too long.`));

      const format = ytdl.chooseFormat(info.formats, { filter: 'audioonly' });

      // Set the status to 200 and pipe the song back.
      if (format.type)
        res.type(format.type);

      res.status(200);
      ytdl.downloadFromInfo(info, { format: format }).pipe(res);
    })
    .catch((err) => res.status(500).send(err.toString()).end());
});

// And we're off to the internets!
app.listen(Port, (err) => {
  if (err)
    return console.log(err);
  console.log(`Listening on port ${Port}`);
});
