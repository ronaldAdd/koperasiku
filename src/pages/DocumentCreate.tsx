
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, FileText, Save } from "lucide-react";
import DocumentEditorWrapper from "@/components/DocumentEditorWrapper";

const DocumentCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [needDate, setNeedDate] = useState("");
  const [documentType, setDocumentType] = useState("word");
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('template_dokumen')
        .select('*')
        .order('nama_template');

      if (error) {
        console.error('Error fetching templates:', error);
        return;
      }

      setTemplates(data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "User tidak ditemukan",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from('dokumen_eoffice')
        .insert({
          judul: title,
          konten_dokumen: content,
          jenis_dokumen: documentType,
          dibuat_oleh: user.email || 'Unknown',
          template_id: templateId ? parseInt(templateId) : null,
          tanggal_kebutuhan: needDate || null,
          status: 'Draft'
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating document:', error);
        toast({
          title: "Error",
          description: "Gagal membuat dokumen",
          variant: "destructive",
        });
        return;
      }

      // Create initial approval step for staff
      await supabase
        .from('approval_dokumen')
        .insert({
          dokumen_id: data.id,
          step: 1,
          peran_approver: 'Staf',
          status: 'Menunggu'
        });

      toast({
        title: "Success",
        description: "Dokumen berhasil dibuat!",
      });

      navigate(`/documents/${data.id}`);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat membuat dokumen",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = async (templateId: string) => {
    setTemplateId(templateId);
    
    if (templateId) {
      try {
        const { data, error } = await supabase
          .from('template_dokumen')
          .select('*')
          .eq('id', parseInt(templateId))
          .single();

        if (error) {
          console.error('Error fetching template:', error);
          return;
        }

        if (data) {
          setDocumentType(data.jenis_dokumen);
          // Remove the konten_template reference since it doesn't exist in the database schema
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Buat Dokumen Baru</h1>
                <p className="text-sm text-gray-500">Sistem E-Office KPBKI</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Document Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Dokumen</CardTitle>
                <CardDescription>
                  Isi informasi dokumen yang akan dibuat
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Judul Dokumen *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Masukkan judul dokumen"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="documentType">Jenis Dokumen</Label>
                    <Select value={documentType} onValueChange={setDocumentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis dokumen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="word">Word Document</SelectItem>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="excel">Excel Document</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="template">Template (Opsional)</Label>
                    <Select value={templateId} onValueChange={handleTemplateSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template: any) => (
                          <SelectItem key={template.id} value={template.id.toString()}>
                            {template.nama_template}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="needDate">Tanggal Kebutuhan</Label>
                    <Input
                      id="needDate"
                      type="date"
                      value={needDate}
                      onChange={(e) => setNeedDate(e.target.value)}
                    />
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate('/dashboard')}
                      className="flex-1"
                    >
                      Batal
                    </Button>
                    <Button type="submit" disabled={loading || !title} className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? 'Menyimpan...' : 'Simpan'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Document Editor */}
          <div className="lg:col-span-2">
            <DocumentEditorWrapper 
              documentId={null}
              documentTitle={title || 'Dokumen Baru'}
              content=""
              isReadOnly={false}
              onContentChange={handleContentChange}
            />

          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentCreate;

