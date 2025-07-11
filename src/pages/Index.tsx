
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Shield, Heart, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (session) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-teal-500 to-blue-600">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/e9169cd1-8eb5-4c2c-ae14-563bd1856e90.png" 
                alt="Koperasi Logo" 
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h1 className="text-white font-bold text-xl">Koperasi Pegawai</h1>
                <p className="text-white/80 text-sm">Biro Klasifikasi Indonesia</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#beranda" className="text-white hover:text-white/80 transition-colors">Beranda</a>
              <a href="#layanan" className="text-white hover:text-white/80 transition-colors">Layanan</a>
              <a href="#transparansi" className="text-white hover:text-white/80 transition-colors">Transparansi</a>
              <a href="#berita" className="text-white hover:text-white/80 transition-colors">Berita</a>
              <a href="#kontak" className="text-white hover:text-white/80 transition-colors">Kontak</a>
            </nav>
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Log in Portal Anggota
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">
            Portal Digital
            <br />
            <span className="text-yellow-400">KPBKI</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto">
            Membangun Kembali Kepercayaan Melalui Transparansi, Inovasi Digital,
            dan Pelayanan Prima untuk Seluruh Anggota
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-3 text-yellow-400" />
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-white/80">Anggota Aktif</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-3 text-yellow-400" />
              <div className="text-3xl font-bold mb-2">Rp 2,5M</div>
              <div className="text-white/80">Aset Koperasi</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 mx-auto mb-3 text-yellow-400" />
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-white/80">Tahun Beroperasi</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 mx-auto mb-3 text-yellow-400" />
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-white/80">Kepuasan Anggota</div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <FileText className="h-12 w-12 text-yellow-400 mb-4" />
              <CardTitle>E-Office System</CardTitle>
              <CardDescription className="text-white/80">
                Sistem dokumen digital dengan approval workflow untuk pengurus koperasi
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <Clock className="h-12 w-12 text-yellow-400 mb-4" />
              <CardTitle>Proses Cepat</CardTitle>
              <CardDescription className="text-white/80">
                Approval dokumen otomatis dengan notifikasi real-time
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardHeader>
              <CheckCircle className="h-12 w-12 text-yellow-400 mb-4" />
              <CardTitle>Tanda Tangan Digital</CardTitle>
              <CardDescription className="text-white/80">
                Validasi dokumen dengan tanda tangan digital dan barcode
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
