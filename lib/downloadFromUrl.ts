import * as http from 'http';
import * as https from 'https';
import * as stream from 'stream';
import * as url from 'url';

import config from './config';

/** Either http or https request options. */
export type HttpRequestOptions = http.RequestOptions | https.RequestOptions;

/**
 * A map of header names to values, as returned by the http/https modules. The `string[]` possibility is ignored because
 * it only applies to the `Cookies` header.
 */
interface IHeaderMap {
    [header: string]: string;
}

/** Represents either the native `http` or `https` module for the purpose we need: the `request` function. */
interface IRequestProvider {
    /** Makes a request with the given options. */
    request(options: HttpRequestOptions, callback: (response: http.IncomingMessage) => void): http.ClientRequest;
}

/** Makes an HTTP(S) request with the given request options (and optional request body). */
export function request(reqOpts: HttpRequestOptions, reqBody?: any): Promise<http.IncomingMessage> {
    return new Promise<http.IncomingMessage>((resolve, reject) => {
        // Choose a provider based on the protocol in the request
        const requestProvider: IRequestProvider = reqOpts.protocol !== null &&
            reqOpts.protocol.toLowerCase() === 'https:' ? https : http;

        const httpRequest = requestProvider.request(reqOpts, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Got bad status code: ${response.statusCode}`));
                return;
            }

            resolve(response);
        });

        // Add a handler for errors to reject gracefully.
        httpRequest.on('error', reject);

        // Write the optional body and send the request.
        if (reqBody !== undefined) {
            httpRequest.write(reqBody);
        }

        httpRequest.end();
    });
}

/**
 * Attempts to check the information of the file at the given URL by sending a HEAD request and checking for the
 * `Content-Length` and `Content-Type` headers.
 *
 * As the name implies, ***this is an attempt*** and isn't guaranteed to succeed, therefore expect this function to be
 * more than willing to throw an error!
 */
export async function attemptToCheckFileInfo(destUrl: url.Url): Promise<Error> {
    // Do a HEAD request to the destination.
    const headResponse = await request({
        method: 'HEAD',
        ...destUrl
    } as HttpRequestOptions);

    try {
        checkResponseHeaders(headResponse.headers as IHeaderMap);
        return undefined;
    } catch (err) {
        return err;
    }
}

/** Checks the given set of headers for mismatches versus the configuration limits. */
export function checkResponseHeaders(headers: IHeaderMap): void {
    // Check `Content-Length` if present.
    if (config.mediaProxying.URL.sizeLimit !== -1 && 'content-length' in headers &&
        parseInt(headers['content-length'] as string, 10) > config.mediaProxying.URL.sizeLimit) {
        throw new Error('Requested file is too large.');
    }

    // Check `Content-Type` if present.
    if (config.mediaProxying.URL.contentTypeRegex !== null && 'content-type' in headers &&
        headers['content-type'].match(config.mediaProxying.URL.contentTypeRegex) === null) {
        throw new Error('Rejected content type from given URL.');
    }
}

/** Downloads audio from a URL. */
export default async function downloadFromUrl(audioUrl: string): Promise<stream.Readable> {
    const destUrl = url.parse(audioUrl);

    if (config.mediaProxying.URL.sizeLimit === -1) {
        // Simply proxy the file, with no care on limitting based on size.
        return request({
            method: 'GET',
            ...destUrl
        } as HttpRequestOptions);
    }

    let headSucceeded = false;
    let threwSignificantError = false;

    try {
        // Do a HEAD request and check the resulting headers.
        const headCheckErr = await attemptToCheckFileInfo(destUrl);

        if (headCheckErr !== undefined) {
            threwSignificantError = true;
            throw headCheckErr;
        }

        headSucceeded = true;
    } catch (err) {
        // Some errors (like the server complaining about HEAD requests) aren't important.
        if (threwSignificantError) {
            throw err;
        }
    }

    // Request the actual file.
    const audioResponse = await request({
        method: 'GET',
        ...destUrl
    } as HttpRequestOptions);

    // Check the headers of the *actual* response too ife we couldn't do a HEAD request.
    if (!headSucceeded) {
        checkResponseHeaders(audioResponse.headers as IHeaderMap);
    }

    // Counts the amount of data that's been recieved to make sure we're under the configuration limit.
    let currentSize = 0;

    return audioResponse.on('data', (data) => {
        currentSize += data.length;
        if (currentSize > config.mediaProxying.URL.sizeLimit) {
            audioResponse.destroy(new Error('Requested file is too large.'));
        }
    });
}
