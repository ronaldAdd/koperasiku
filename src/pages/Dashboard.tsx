
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Building, 
  FileText, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  Filter
} from "lucide-react";

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    fetchDocuments();
  }, []);

  useEffect(() => {
    filterDocuments();
  }, [documents, searchTerm, statusFilter]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/auth');
      return;
    }
    setUser(user);
  };

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('dokumen_eoffice')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching documents:', error);
        toast({
          title: "Error",
          description: "Gagal memuat dokumen",
          variant: "destructive",
        });
        return;
      }

      setDocuments(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat memuat dokumen",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterDocuments = () => {
    let filtered = documents;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((doc: any) =>
        doc.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.dibuat_oleh.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((doc: any) => doc.status === statusFilter);
    }

    setFilteredDocuments(filtered);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Draft':
        return <Clock className="h-4 w-4 text-gray-500" />;
      case 'Approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Ditolak':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Ditolak': return 'bg-red-100 text-red-800';
      case 'Menunggu': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building className="h-12 w-12 animate-pulse mx-auto mb-4 text-primary" />
          <p>Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-lg">
                <Building className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard E-Office</h1>
                <p className="text-sm text-gray-500">Sistem Manajemen Dokumen KPBKI</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Selamat datang, {user?.email}
              </span>
              <Button variant="outline" onClick={handleLogout}>
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Aksi Cepat</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer" 
                  onClick={() => navigate('/documents/create')}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Plus className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Buat Dokumen Baru</h3>
                    <p className="text-sm text-gray-500">Mulai dokumen dari template</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Menunggu Approval</h3>
                    <p className="text-sm text-gray-500">
                      {documents.filter((doc: any) => doc.status === 'Menunggu').length} dokumen
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Total Dokumen</h3>
                    <p className="text-sm text-gray-500">{documents.length} dokumen</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Daftar Dokumen</CardTitle>
                <CardDescription>Kelola semua dokumen e-office Anda</CardDescription>
              </div>
              <Button onClick={() => navigate('/documents/create')}>
                <Plus className="h-4 w-4 mr-2" />
                Buat Dokumen
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari dokumen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">Semua Status</option>
                  <option value="Draft">Draft</option>
                  <option value="Menunggu">Menunggu</option>
                  <option value="Approved">Approved</option>
                  <option value="Ditolak">Ditolak</option>
                </select>
              </div>
            </div>

            {/* Documents Table */}
            <div className="space-y-4">
              {filteredDocuments.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {documents.length === 0 ? 'Belum ada dokumen' : 'Tidak ada dokumen yang sesuai'}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {documents.length === 0 
                      ? 'Mulai dengan membuat dokumen pertama Anda' 
                      : 'Coba ubah filter pencarian Anda'
                    }
                  </p>
                  {documents.length === 0 && (
                    <Button onClick={() => navigate('/documents/create')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Buat Dokumen Pertama
                    </Button>
                  )}
                </div>
              ) : (
                filteredDocuments.map((document: any) => (
                  <Card key={document.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-lg">{document.judul}</h3>
                            <Badge className={getStatusColor(document.status)}>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(document.status)}
                                <span>{document.status}</span>
                              </div>
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                            <div>
                              <span className="font-medium">Dibuat oleh:</span>
                              <p>{document.dibuat_oleh}</p>
                            </div>
                            <div>
                              <span className="font-medium">Tanggal:</span>
                              <p>{new Date(document.created_at).toLocaleDateString('id-ID')}</p>
                            </div>
                            <div>
                              <span className="font-medium">Jenis:</span>
                              <p className="capitalize">{document.jenis_dokumen}</p>
                            </div>
                            {document.tanggal_kebutuhan && (
                              <div>
                                <span className="font-medium">Deadline:</span>
                                <p>{new Date(document.tanggal_kebutuhan).toLocaleDateString('id-ID')}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/documents/${document.id}`)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Lihat
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
