// You might question, "why is this a TypeScript file? isn't it better suited to be a JSON file?"
//
// To that, I answer, "you're correct;" however, complications come along with keeping this fine as a JSON file. Most
// prominently, the issue of importing the JSON file is needlessly complex relative to the simple task at hand--
// especially if type information is wanted (it's not really a necessity, but it's nice to have). To save on simplicity,
// I've simply chosen to store the config as a TypeScript file. ¯\_(ツ)_/¯
//
// (Also, regex.)

/** The application configuration. */
export default {
    /**
     * Describes the desired availability of and the limits on various methods of proxying media to clients (generally
     * to get around CORS restrictions).
     */
    mediaProxying: {
        /** The availability and restrictions on YouTube proxying. */
        YouTube: {
            /** Whether YouTube proxying is enabled. */
            enabled: true,

            /** The upper limit (in seconds) that a proxied video/song/audio can be. `-1` signifies no limit. */
            timeLimit: 15 * 60
        },

        /** The availability of URL proxying. */
        URL: {
            /** Whether URL proxying is enabled. */
            enabled: true,

            /** The limit (in bytes) of the size of proxied audio files. `-1` signifies no limit. */
            sizeLimit: 10 * 1024 * 1024,

            /**
             * The regular expression that the `Content-Type` header of all proxied requests must match.
             *
             * Sane options:
             * * `/^(?!text\/html)/i` - Blacklist; disallow `text/html` content types.
             * * `/^(audio\/|application\/ogg|)/i` - Whitelist; any `audio/` type (and `application/ogg`).
             *
             * Insane option:
             * * `null` - No regular expression to be matched.
             */
            contentTypeRegex: /^(?!text\/html)/i
        }
    },

    /** The port the application is running on. */
    port: 8080
};
