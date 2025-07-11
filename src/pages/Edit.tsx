import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "@/lib/api/api";
import SDK from "@onlyoffice/docspace-sdk-js";

const EditDocument = () => {
  const { fileId } = useParams();

  const [token, setToken] = useState<string | null>(null);
  const [webUrl, setWebUrl] = useState<string | null>(null);
  const [documentId, setDocumentId] = useState<number | null>(null);

  // Ambil data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(`/api/2.0/files/file/${fileId}/openedit`);
        const conf = response?.response;

        setToken(response?.response.token || null);
        setWebUrl(conf?.file?.webUrl || null);
        setDocumentId(conf?.file?.id || null);
        console.log(token,webUrl,documentId,'conf');
        
      } catch (err) {
        console.error("Gagal ambil data:", err);
      }
    };

    if (fileId) fetchData();
  }, [fileId]);

  // Init OnlyOffice setelah state siap
  useEffect(() => {
    if (token && webUrl && documentId) {
      const container = document.getElementById("ds-frame");
      if (!container) return;

      const sdk = new SDK();
      sdk.init({
        src: "https://sschouse2507030347.onlyoffice.com",
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

};

export default EditDocument;
