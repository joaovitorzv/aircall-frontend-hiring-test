import { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const onResponse = (response: AxiosResponse): AxiosResponse => {
  if (response.config.url?.includes('/auth/login')) {

    return response
  }
  return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}