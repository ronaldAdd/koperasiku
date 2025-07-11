import React from 'react';
import DocumentEditor from './DocumentEditor';
import { useOnlyOfficeEditor } from '@/hooks/useOnlyOfficeEditor';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface DocumentEditorWrapperProps {
  documentId: number | null;
  documentTitle: string;
  content?: string;
  isReadOnly?: boolean;
  onContentChange?: (content: string) => void;
}

const DocumentEditorWrapper: React.FC<DocumentEditorWrapperProps> = ({
  documentId,
  documentTitle,
  content,
  isReadOnly = false,
  onContentChange
}) => {
  const { config, isEditorReady, isLoading } = useOnlyOfficeEditor({
    documentId,
    onContentChange
  });

  if (isLoading) {
    return (
      <Card className="w-full h-[600px]">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Memuat editor dokumen...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!config || !isEditorReady) {
    return (
      <Card className="w-full h-[600px]">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-muted-foreground">Gagal memuat konfigurasi editor</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const editorId = `onlyoffice-editor-${documentId || 'new'}-${Date.now()}`;

  return (
    <Card className="w-full h-[600px]">
      <CardContent className="p-0 h-full">
        <DocumentEditor
          id={editorId}
          documentServerUrl={config.documentServerUrl}
          config={config}
          height="600px"
          width="100%"
          events_onDocumentReady={() => {
            console.log('Document is ready');
          }}
          events_onError={(error) => {
            console.error('Editor error:', error);
          }}
          events_onDocumentStateChange={(event) => {
            console.log('Document state changed:', event);
          }}
        />
      </CardContent>
    </Card>
  );
};

export default DocumentEditorWrapper;
