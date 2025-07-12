// auth.js
import { post } from '@/lib/api/api';

export async function loginOnlyOffice(userName, password) {
  const response = await post('/api/2.0/authentication', {
    userName,
    password,
  });

  const token = response?.response?.token;
  if (!token) {
    throw new Error('Token tidak ditemukan di response.');
  }

  return token;
}
