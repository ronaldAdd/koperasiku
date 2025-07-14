import { get } from "@/lib/api/api";

/**
 * Ambil konfigurasi untuk mengedit file OnlyOffice
 * @param fileId ID file
 * @returns Token, webUrl, dan documentId
 */
export async function getFileEditConfig(fileId: string) {
  const response = await get(`/api/2.0/files/file/${fileId}/openedit`);

  const config = response?.response;
  console.log(config,'getFileEditConfig');
  
  if (!config?.file || !config?.token) {
    throw new Error("Data file atau token tidak ditemukan.");
  }

  return {
    token: config.token,
    webUrl: config.file.webUrl,
    documentId: config.file.id,
  };
}
