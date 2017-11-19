import IClientConfig from '../IClientConfig';

/** The promise responsible for getting the config from the server. */
const fetchPromise: Promise<IClientConfig> = fetch('/api/config').then((resp) => resp.json());

/** Responsible for forwarding the Promise that gets the config to the server. */
export default (): Promise<IClientConfig> => fetchPromise;
