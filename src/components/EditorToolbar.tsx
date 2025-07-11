
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Download, Save, Loader2 } from 'lucide-react';
import { exportToPDF } from '@/utils/pdfExport';

interface EditorToolbarProps {
  documentTitle: string;
  isReadOnly: boolean;
  isEditorReady: boolean;
  frameRef: React.RefObject<HTMLDivElement> | null;
  documentId: number | null;
  onSave: () => Promise<void>;
}

const EditorToolbar = ({
  documentTitle,
  isReadOnly,
  isEditorReady,
  frameRef,
  documentId,
  onSave
}: EditorToolbarProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      await onSave();
      
      toast({
        title: "Success",
        description: "Dokumen berhasil disimpan",
      });
    } catch (error) {
      console.error('Error saving document:', error);
      toast({
        title: "Error",
        description: "Gagal menyimpan dokumen",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    
    try {
      await exportToPDF(frameRef, documentId, documentTitle);
      
      toast({
        title: "Success",
        description: "PDF berhasil diunduh",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Gagal membuat PDF",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">Editor Dokumen</h3>
      <div className="flex space-x-2">
        {!isReadOnly && (
          <Button
            onClick={handleSave}
            disabled={isSaving || !isEditorReady}
            variant="outline"
            size="sm"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Menyimpan...' : 'Simpan'}
          </Button>
        )}
        <Button
          onClick={handleExportPDF}
          disabled={isExporting || !isEditorReady}
          size="sm"
        >
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Membuat PDF...
            </>
          ) : (
            'Export PDF'
          )}
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
