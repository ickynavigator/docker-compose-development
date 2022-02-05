import axios from 'axios';

export const ApiUrl = process.env.NEXT_PUBLIC_API_URL;
export const BASEURL = `${ApiUrl}/api/v1`;

export const getAllTodos = async (pageNum = 1, pageSize = 10) => {
  const page = pageNum ? `pageNumber=${pageNum}` : '';
  const size = pageSize ? `pageSize=${pageSize}` : '';
  const url = `${BASEURL}/todo?${page}&${size}`;

  const res = axios.get(url);
  return (await res).data;
};
