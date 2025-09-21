import axios, { AxiosInstance } from 'axios';

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // this.instance.interceptors.response.use(
    //   (response) => response.data, // return body have data
    //   async (error) => await Promise.reject(error)
    // );
  }
}

const http = new Http().instance;

export default http;
