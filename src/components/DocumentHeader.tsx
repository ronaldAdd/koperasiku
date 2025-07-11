
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText } from "lucide-react";

interface DocumentHeaderProps {
  document: {
    judul: string;
    status: string;
  };
}

const DocumentHeader = ({ document }: DocumentHeaderProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-500';
      case 'Menunggu': return 'bg-yellow-500';
      case 'Disetujui': return 'bg-green-500';
      case 'Ditolak': return 'bg-red-500';
      case 'Approved': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{document.judul}</h1>
                <p className="text-sm text-gray-500">Sistem E-Office KPBKI</p>
              </div>
            </div>
          </div>
          <Badge className={getStatusColor(document.status)}>
            {document.status}
          </Badge>
        </div>
      </div>
    </header>
  );
};

export default DocumentHeader;
