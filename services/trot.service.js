const axios = require('axios');
const httpRequest = require('../lib/httpRequest');
const config = require('../config');

axiosApiInstance = httpRequest.getInstance({
    baseURL: config.apiBaseUrl,
    // timeout: 1000,
})

let token = null

const getAuthToken = async () => (await axios({
    method: 'post',
    url: `${config.apiBaseUrl}/auth`,
    data: config.authBody
})).data.token;

exports.getRaceStatus = () => axiosApiInstance.get(`/results`)

axiosApiInstance.interceptors.request.use(async config => {
    if (!token) token = await getAuthToken();
    config.headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    return config;
}, error => { Promise.reject(error) });

axiosApiInstance.interceptors.response.use((response) => { return response }, async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status && [403, 401,].includes(error.response.status)
        && !originalRequest._retry) {
        originalRequest._retry = true;
        token = await getAuthToken()
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
});

