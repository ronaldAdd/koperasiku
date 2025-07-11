
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, User, MessageSquare } from "lucide-react";

interface ApprovalStep {
  id: number;
  step: number;
  peran_approver: string;
  status: string;
  nama_approver?: string;
  tanggal_approval?: string;
  catatan?: string;
}

interface ApprovalWorkflowProps {
  approvals: ApprovalStep[];
}

const ApprovalWorkflow = ({ approvals }: ApprovalWorkflowProps) => {
  const getStepIcon = (status: string) => {
    switch (status) {
      case 'Disetujui':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Ditolak':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'Menunggu':
        return <Clock className="h-5 w-5 text-yellow-500 animate-pulse" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'Disetujui': return 'bg-green-100 text-green-800';
      case 'Ditolak': return 'bg-red-100 text-red-800';
      case 'Menunggu': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alur Persetujuan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {approvals.map((approval, index) => (
            <div key={approval.id} className="relative">
              {/* Connector Line */}
              {index < approvals.length - 1 && (
                <div className="absolute left-[10px] top-8 w-0.5 h-12 bg-gray-200" />
              )}
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getStepIcon(approval.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      Step {approval.step}: {approval.peran_approver}
                    </h4>
                    <Badge className={getStepColor(approval.status)}>
                      {approval.status}
                    </Badge>
                  </div>
                  
                  {approval.nama_approver && (
                    <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
                      <User className="h-3 w-3" />
                      <span>{approval.nama_approver}</span>
                    </div>
                  )}
                  
                  {approval.tanggal_approval && (
                    <p className="text-xs text-gray-500 mb-2">
                      {formatDate(approval.tanggal_approval)}
                    </p>
                  )}
                  
                  {approval.catatan && (
                    <div className="bg-gray-50 rounded-md p-3 mt-2">
                      <div className="flex items-start space-x-2">
                        <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{approval.catatan}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {approvals.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Belum ada riwayat persetujuan</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApprovalWorkflow;
