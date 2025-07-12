// src/helpers/api.ts

const BASE_URL = import.meta.env.VITE_ONLYOFFICE_API_URL;
const TOKEN = import.meta.env.VITE_ONLYOFFICE_TOKEN;


async function handleResponse<T>(res: Response, endpoint: string): Promise<T> {
  if (!res.ok) {
    let errorMessage = `Request to ${endpoint} failed (${res.status})`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorMessage;
    } catch (_) {}
    throw new Error(errorMessage);
  }
  return res.json();
}

async function request<T = any>(method: string, endpoint: string, body?: any): Promise<T> {
  const options: RequestInit = {
    method,
    headers: getHeaders(),
  };
  if (body) options.body = JSON.stringify(body);

  if (import.meta.env.DEV) {
    console.log(`[API] ${method} ${BASE_URL}${endpoint}`, body || '');
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  return handleResponse<T>(res, endpoint);
}

// Fungsi utama API
export const get = <T = any>(endpoint: string) => request<T>('GET', endpoint);
export const post = <T = any>(endpoint: string, body: any) => request<T>('POST', endpoint, body);
export const put = <T = any>(endpoint: string, body: any) => request<T>('PUT', endpoint, body);
export const del = <T = any>(endpoint: string) => request<T>('DELETE', endpoint);

export async function uploadFile<T = any>(folderId: string, file: File): Promise<T> {
  const formData = new FormData();
  formData.append('file', file);
  const endpoint = `/api/2.0/files/${folderId}/file`;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: getUploadHeaders(),
    body: formData,
  });

  return handleResponse<T>(res, endpoint);
}

// Default export
const api = { get, post, put, del, uploadFile };
export default api;
