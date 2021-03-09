import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const onResponse = (response: AxiosResponse): AxiosResponse => {
  console.log("fodase")
  console.log(`[response] [${JSON.stringify(response)}]`);
  return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}