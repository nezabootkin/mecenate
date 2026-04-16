import axios from 'axios';

const api = axios.create({
  baseURL: 'https://k8s.mectest.ru/test-app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    Authorization: 'Bearer 550e8400-e29b-41d4-a716-446655440000',
  },
});

export enum ENDPOINT_TYPE {
  POSTS = 'posts',
  LIKE = 'like',
  COMMENTS = 'comments',
}

interface IPagination {
  page: number;
  limit: number;
}

export const fetchData = async (endpoint: ENDPOINT_TYPE, options?: IPagination) => {
  try {
    const response = await api.get(`/${endpoint}`, {
      params: {
        page: options ? options.page : 1,
        limit: options ? options.limit : 10,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDataById = async (endpoint: ENDPOINT_TYPE, id: string) => {
  try {
    const response = await api.get(`/${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDataByIdAndSubEndpoint = async (endpoint: ENDPOINT_TYPE, id: string, subEndpoint: ENDPOINT_TYPE) => {
  try {
    const response = await api.get(`/${endpoint}/${id}/${subEndpoint}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};