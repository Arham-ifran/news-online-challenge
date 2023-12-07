import Axios from './_instance';


let abortController = new AbortController();

export async function getHttpRequest(url: string,  config = {}) {
    const requestConfig = {
        signal: abortController.signal,
        ...config,
    };
    return Axios.get(url, requestConfig);
}

export async function postHttpRequest(url: string, data: any, config = {}) {
    const requestConfig = {
        signal: abortController.signal,
        ...config,
    };

    return Axios.post(url, data, requestConfig);
}

export async function putHttpRequest(url: string, data: any, config = {}) {
    const requestConfig = {
        signal: abortController.signal,
        ...config,
    };
    return Axios.put(url, data, requestConfig);
}

export function cancelOngoingHttpRequest() {
    abortController.abort();

    // regenerate AbortSignal for future HTTP calls
    abortController = new AbortController();
}
