/** The structure of the configuration exposed by the `/config` endpoint. */
export default interface IClientConfig {
    /**
     * Describes the desired availability of and the limits on various methods of proxying media to clients (generally
     * to get around CORS restrictions).
     */
    mediaProxying: {
        /** The availability and restrictions on YouTube proxying. */
        YouTube: {
            /** Whether YouTube proxying is enabled. */
            enabled: boolean,

            /** The upper limit (in seconds) that a proxied video/song/audio can be. `-1` signifies no limit. */
            timeLimit: number
        },

        /** The availability of URL proxying. */
        URL: {
            /** Whether URL proxying is enabled. */
            enabled: boolean,

            /** The limit (in bytes) of the size of proxied audio files. `-1` signifies no limit. */
            sizeLimit: number
        }
    };
}
