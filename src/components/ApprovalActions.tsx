
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle } from "lucide-react";

interface ApprovalActionsProps {
  canApprove: boolean;
  currentStep: any;
  onApproval: (action: 'approve' | 'reject', note: string) => Promise<void>;
  isSubmitting: boolean;
}

const ApprovalActions = ({ canApprove, currentStep, onApproval, isSubmitting }: ApprovalActionsProps) => {
  const [approvalNote, setApprovalNote] = useState("");

  const handleApproval = async (action: 'approve' | 'reject') => {
    await onApproval(action, approvalNote);
    setApprovalNote("");
  };

  if (!canApprove || !currentStep) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Aksi Persetujuan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Catatan</label>
          <Textarea
            value={approvalNote}
            onChange={(e) => setApprovalNote(e.target.value)}
            placeholder="Tambahkan catatan persetujuan..."
            rows={3}
          />
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => handleApproval('approve')}
            disabled={isSubmitting}
            className="flex-1"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Memproses...' : 'Setujui'}
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleApproval('reject')}
            disabled={isSubmitting}
            className="flex-1"
          >
            <XCircle className="h-4 w-4 mr-2" />
            Tolak
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApprovalActions;
