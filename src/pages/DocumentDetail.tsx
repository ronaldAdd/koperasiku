
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Clock, FileText } from "lucide-react";
import DocumentEditorWrapper from "@/components/DocumentEditorWrapper";
import ApprovalWorkflow from "@/components/ApprovalWorkflow";
import DocumentHeader from "@/components/DocumentHeader";
import DocumentInfo from "@/components/DocumentInfo";
import ApprovalActions from "@/components/ApprovalActions";
import { get, post } from "@/lib/api/api";

const DocumentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [document, setDocument] = useState<any>(null);
  const [approvals, setApprovals] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submittingApproval, setSubmittingApproval] = useState(false);

  // Convert string id to number once
  const documentId = id ? parseInt(id) : null;

  useEffect(() => {
    if (documentId) {
      fetchDocument();
      getCurrentUser();
    }
  }, [documentId]);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUser(user);
  };

  const fetchDocument = async () => {
    if (!documentId) return;
    
    try {
      // Fetch document details
      const { data: docData, error: docError } = await supabase
        .from('dokumen_eoffice')
        .select('*')
        .eq('id', documentId)
        .single();

      if (docError) {
        toast({
          title: "Error",
          description: "Gagal memuat dokumen",
          variant: "destructive",
        });
        return;
      }

      setDocument(docData);

      // Fetch approval history
      const { data: approvalData, error: approvalError } = await supabase
        .from('approval_dokumen')
        .select('*')
        .eq('dokumen_id', documentId)
        .order('step');

      if (!approvalError) {
        setApprovals(approvalData || []);
      }
    } catch (error) {
      console.error('Error fetching document:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat memuat dokumen",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = async (content: string) => {
    if (!documentId) return;
    
    try {
      const { error } = await supabase
        .from('dokumen_eoffice')
        .update({ konten_dokumen: content })
        .eq('id', documentId);

      if (error) {
        console.error('Error updating document:', error);
        toast({
          title: "Error",
          description: "Gagal menyimpan perubahan",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const getCurrentApprovalStep = () => {
    return approvals.find(approval => approval.status === 'Menunggu');
  };

  const canCurrentUserApprove = () => {
    const currentStep = getCurrentApprovalStep();
    if (!currentStep || !currentUser) return false;
    return true; // Simplified for now
  };

  const handleApproval = async (action: 'approve' | 'reject', note: string) => {
    if (!documentId) return;
    
    const currentStep = getCurrentApprovalStep();
    if (!currentStep) return;

    setSubmittingApproval(true);

    try {      
      // Update current approval step
      const { error: updateError } = await supabase
        .from('approval_dokumen')
        .update({
          status: action === 'approve' ? 'Disetujui' : 'Ditolak',
          nama_approver: currentUser?.email || 'Unknown',
          tanggal_approval: new Date().toISOString(),
          catatan: note
        })
        .eq('id', currentStep.id);

      if (updateError) throw updateError;

      if (action === 'approve') {
        // Check if this is the final approval step
        const nextStep = currentStep.step + 1;
        const roleSequence = ['Staf', 'Manajer', 'Bendahara', 'Ketua'];
        
        if (nextStep <= roleSequence.length) {
          // Create next approval step
          await supabase
            .from('approval_dokumen')
            .insert({
              dokumen_id: documentId,
              step: nextStep,
              peran_approver: roleSequence[nextStep - 1],
              status: 'Menunggu'
            });
        } else {
          // Final approval - update document status
          await supabase
            .from('dokumen_eoffice')
            .update({ status: 'Approved' })
            .eq('id', documentId);
        }
      } else {
        // Rejection - update document status
        await supabase
          .from('dokumen_eoffice')
          .update({ status: 'Ditolak' })
          .eq('id', documentId);
      }

      toast({
        title: "Success",
        description: `Dokumen berhasil ${action === 'approve' ? 'disetujui' : 'ditolak'}`,
      });

      // Refresh data
      fetchDocument();
    } catch (error) {
      console.error('Error processing approval:', error);
      toast({
        title: "Error",
        description: "Gagal memproses persetujuan",
        variant: "destructive",
      });
    } finally {
      setSubmittingApproval(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Clock className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Memuat dokumen...</p>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold mb-2">Dokumen tidak ditemukan</h2>
          <Button onClick={() => navigate('/dashboard')}>
            Kembali ke Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DocumentHeader document={document} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Document Editor */}
          <div className="lg:col-span-2">
            {/* <DocumentEditorWrapper 
              documentId={documentId}
              documentTitle={document.judul}
              content={document.konten_dokumen}
              isReadOnly={document.status === 'Approved'}
              onContentChange={handleContentChange}
            /> */}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <DocumentInfo document={document} />
            <ApprovalWorkflow approvals={approvals} />
            <ApprovalActions 
              canApprove={canCurrentUserApprove()}
              currentStep={getCurrentApprovalStep()}
              onApproval={handleApproval}
              isSubmitting={submittingApproval}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentDetail;
