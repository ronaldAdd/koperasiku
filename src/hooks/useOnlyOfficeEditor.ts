import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface UseOnlyOfficeEditorProps {
  documentId: number | null;
  onContentChange?: (content: string) => void;
}

export const useOnlyOfficeEditor = ({ documentId, onContentChange }: UseOnlyOfficeEditorProps) => {
  const [config, setConfig] = useState<any>(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadConfig = async () => {
      setIsLoading(true);
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          toast({
            title: "Error",
            description: "User tidak terautentikasi",
            variant: "destructive",
          });
          return;
        }

        const response = await supabase.functions.invoke('generate-onlyoffice-config', {
          body: {
            documentId,
            documentTitle: documentId ? `Dokumen ${documentId}` : 'Dokumen Baru'
          }
        });

        if (response.error) {
          throw new Error(response.error.message);
        }

        // Tambahkan fallback documentServerUrl jika belum ada
        const documentServerUrl = response.data.documentServerUrl || 'http://31.97.63.26:8080';

        setConfig({
          ...response.data,
          documentServerUrl,
        });

        setIsEditorReady(true);
        
      } catch (error) {
        console.error('Error loading OnlyOffice config:', error);
        toast({
          title: "Error",
          description: "Gagal memuat konfigurasi editor OnlyOffice",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, [documentId, toast]);

  return {
    config,
    isEditorReady,
    isLoading
  };
};
