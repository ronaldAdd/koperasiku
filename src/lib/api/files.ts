// src/lib/api/files.ts
import { post } from "@/lib/api/api";

/**
 * Membuat file baru di OnlyOffice
 * @param folderId - ID folder tempat file akan dibuat
 * @param title - Nama file (dengan ekstensi, misal "file.docx")
 * @param content - Konten awal file
 * @param templateId - (Opsional) ID template yang ingin digunakan
 * @returns response dari API OnlyOffice
 */

export async function createNewOnlyOfficeFile(
  folderId: string,
  title: string,
  content?: string,
  templateId?: number
): Promise<any> {
  const payload: Record<string, any> = { title };

  if (content) payload.content = content;
  if (templateId) payload.templateId = templateId;

  const response = await post(`/api/2.0/files/${folderId}/file`, payload);

  if (!response?.response?.id) {
    throw new Error("Gagal membuat file. ID tidak ditemukan.");
  }

  return response;
}