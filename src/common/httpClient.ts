import axios, { AxiosResponse } from 'axios';

const HttpClient = axios.create({
  baseURL: `${process.env.REACT_APP_API}`,
});

HttpClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response: AxiosResponse) {
    const { data } = response;
    if (data?.error) {
      return Promise.reject(data?.error);
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export { HttpClient };
