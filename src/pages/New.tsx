import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "@/lib/api/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Save } from "lucide-react";

export default function OnlyOfficeFileCreate() {
  const [title, setTitle] = useState("Dokumen Baru");
  const [extension, setExtension] = useState("docx");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const folderId = "1323682"; // Ganti dengan folder ID yang valid

  const createNewFile = async () => {
    setLoading(true);
    try {
      const response = await post(`/api/2.0/files/${folderId}/file`, {
        title: `${title}.${extension}`,
        content: "ini adalah tutorial",
      });

      const fileId = response?.response?.id;
      setResult(response);

      if (fileId) {
        // Redirect ke halaman edit
        navigate(`/documents/${fileId}`);
      } else {
        console.warn("ID file tidak ditemukan di response.");
      }
    } catch (error) {
      console.error("Gagal buat file:", error);
      setResult({ error: "Gagal membuat file" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Buat File OnlyOffice</CardTitle>
            <CardDescription>
              Masukkan nama file lalu pilih ekstensi dokumen.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Judul File</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Proposal_Kegiatan"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ext">Tipe Dokumen</Label>
              <Select value={extension} onValueChange={setExtension}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe dokumen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="docx">Word (.docx)</SelectItem>
                  <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                  <SelectItem value="pptx">PowerPoint (.pptx)</SelectItem>
                  <SelectItem value="txt">Text (.txt)</SelectItem>
                  <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={createNewFile} disabled={!title || loading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Membuat..." : "Buat Dokumen"}
            </Button>
          </CardContent>
        </Card>

        {result?.response?.file?.id && (
          <Card>
            <CardHeader>
              <CardTitle>File Berhasil Dibuat</CardTitle>
              <CardDescription>ID File: {result.response.file.id}</CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}
