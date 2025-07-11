import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Building } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // List of authorized board member emails
  const authorizedEmails = [
    "admin@test.com",
    "manager@test.com",
    "bendahara@test.com",
    "ketua@test.com",
    "sekretaris@kpbki.com",
    "wakil.ketua@kpbki.com",
    "anggota1@kpbki.com",
    "anggota2@kpbki.com"
  ];

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if email is authorized
    if (!authorizedEmails.includes(email.toLowerCase())) {
      toast({
        title: "Akses Ditolak",
        description: "Hanya pengurus koperasi yang dapat mengakses sistem ini.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Berhasil",
          description: "Login berhasil! Selamat datang di Portal E-Office KPBKI.",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-teal-500 to-blue-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/e9169cd1-8eb5-4c2c-ae14-563bd1856e90.png" 
              alt="Koperasi Logo" 
              className="h-16 w-16 rounded-full"
            />
          </div>
          <CardTitle className="text-2xl">Portal E-Office KPBKI</CardTitle>
          <CardDescription>
            Sistem E-Office untuk Pengurus Koperasi Pegawai BKI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Pengurus</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@test.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Memproses..." : "Masuk ke Sistem"}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Akses Terbatas:</strong> Hanya pengurus koperasi yang terdaftar yang dapat mengakses sistem ini.
            </p>
            <p className="text-xs text-yellow-700 mt-2">
              Email yang diizinkan: admin@test.com, manager@test.com, bendahara@test.com, ketua@test.com
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
