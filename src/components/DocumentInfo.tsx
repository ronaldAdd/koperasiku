
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

interface DocumentInfoProps {
  document: {
    dibuat_oleh: string;
    created_at: string;
    jenis_dokumen: string;
    tanggal_kebutuhan?: string;
  };
}

const DocumentInfo = ({ document }: DocumentInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Dokumen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Dibuat oleh</label>
          <div className="flex items-center space-x-2 mt-1">
            <User className="h-4 w-4" />
            <span>{document.dibuat_oleh}</span>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Tanggal Dibuat</label>
          <p>{new Date(document.created_at).toLocaleDateString('id-ID')}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Jenis Dokumen</label>
          <p className="capitalize">{document.jenis_dokumen}</p>
        </div>
        {document.tanggal_kebutuhan && (
          <div>
            <label className="text-sm font-medium text-gray-500">Tanggal Kebutuhan</label>
            <p>{new Date(document.tanggal_kebutuhan).toLocaleDateString('id-ID')}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentInfo;
