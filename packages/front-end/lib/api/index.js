import axios from 'axios';

export const ApiUrl = process.env.NEXT_PUBLIC_API_URL;
export const SERVERURL = `${ApiUrl}/api/v1`;
export const BASEURL = '/api/v1';

export const getAllTodos = async (pageNum = 1, pageSize = 10) => {
  const page = pageNum ? `pageNumber=${pageNum}` : '';
  const size = pageSize ? `pageSize=${pageSize}` : '';
  const url = `${SERVERURL}/todo?paginate=false&${page}&${size}`;

  const res = axios.get(url);
  return (await res).data;
};

export const createNewTodo = async (data) => {
  const url = `${BASEURL}/todo`;
  const res = axios.post(url, data);
  return (await res).data;
};

export const deleteTodo = async (id) => {
  const url = `${BASEURL}/todo/${id}`;
  axios.delete(url);
};

export const toggleTodo = async (id) => {
  const url = `${BASEURL}/todo/${id}/toggle`;
  const res = axios.put(url);
  return (await res).data;
};
