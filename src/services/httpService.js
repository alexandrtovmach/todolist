import axios from 'axios';

export function HttpService(config) {
    const correctExample = `
    Example of correct request:
    httpRequest({
        type: 'POST',
        path: '/api/path',
        body: 'data'
    })`
    if (!config) {
        return console.error('HttpService:', 'Empty config object.' + correctExample);
    } else {
        if (!config.path) {
            return console.error('HttpService:', 'Empty "path" config.' + correctExample);
        }
        switch (config.type) {
            case 'GET': {
                return axios.get(config.path);
                break;
            }
            case 'POST': {
                return axios.post(config.path, config.body || {});
                break;
            }
            case 'PUT': {
                return axios.put(config.path, config.body || {});
                break;
            }
            case 'DELETE': {
                return axios.delete(config.path);
                break;
            }
            case undefined: {
                return console.error('HttpService:', 'Empty "type" config.' + correctExample);
                break;
            }
            default: {
                return console.error('HttpService:', 'Incorrect "type" config.' + correctExample);
                break;
            }
        }
    }
}
