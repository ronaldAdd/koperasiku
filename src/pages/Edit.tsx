import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFileEditConfig } from "@/lib/api/files/edit";
import SDK from "@onlyoffice/docspace-sdk-js";

export default function EditDocument() {
  const { fileId } = useParams();
  const [token, setToken] = useState<string | null>(null);
  const [webUrl, setWebUrl] = useState<string | null>(null);
  const [documentId, setDocumentId] = useState<number | null>(null);

  useEffect(() => {
    const fetchEditConfig = async () => {
      try {
        if (!fileId) return;

        const { token, webUrl, documentId } = await getFileEditConfig(fileId);
        setToken(token);
        setWebUrl(webUrl);
        setDocumentId(documentId);
      } catch (err) {
        console.error("Gagal ambil data edit file:", err);
      }
    };

    fetchEditConfig();
  }, [fileId]);

  useEffect(() => {
    if (token && webUrl && documentId) {
      const container = document.getElementById("ds-frame");
      if (!container) return;

      const sdk = new SDK();
      sdk.init({
        src: "https://sschouse2507030347.onlyoffice.com", // Ganti dengan domain OnlyOffice kamu
        mode: "editor",
        width: "100%",
        height: "100%",
        frameId: "ds-frame",
        init: true,
        id: documentId,
        requestToken: token,
      });
    }
  }, [token, webUrl, documentId]);

  return (
    <div
      id="onlyoffice-container"
      style={{
        margin: 0,
        padding: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        id="ds-frame"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
}
