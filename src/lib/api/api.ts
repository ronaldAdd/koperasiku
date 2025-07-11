const BASE_URL = import.meta.env.VITE_ONLYOFFICE_API_URL;
const TOKEN = import.meta.env.VITE_ONLYOFFICE_TOKEN;

function getHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  };
}

export async function get<T = any>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error(`GET ${endpoint} gagal`);
  return res.json();
}

export async function post<T = any>(endpoint: string, body: any): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${endpoint} gagal`);
  return res.json();
}

export async function put<T = any>(endpoint: string, body: any): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`PUT ${endpoint} gagal`);
  return res.json();
}

export async function del<T = any>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error(`DELETE ${endpoint} gagal`);
  return res.json();
}
