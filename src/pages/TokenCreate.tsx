import { useState } from "react";
import { post } from "@/lib/api/api";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";

export default function TokenCreate() {
  const [userName, setUserName] = useState(import.meta.env.VITE_ONLYOFFICE_EMAIL);
  const [password, setPassword] = useState(import.meta.env.VITE_ONLYOFFICE_PWD);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await post("/api/2.0/authentication", {
        userName,
        password,
      });

      const resultToken = response?.response?.token;
      if (resultToken) {
        setToken(resultToken);
        // contoh simpan token ke localStorage
        localStorage.setItem("onlyoffice_token", resultToken);
      } else {
        setErrorMsg("Token tidak ditemukan di response.");
      }
    } catch (error) {
      console.error("Login gagal:", error);
      setErrorMsg("Gagal login. Cek username/password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Login OnlyOffice</CardTitle>
            <CardDescription>
              Masukkan email dan password untuk mendapatkan token akses.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button onClick={handleLogin} disabled={loading}>
              <LogIn className="mr-2 h-4 w-4" />
              {loading ? "Memproses..." : "Login & Ambil Token"}
            </Button>

            {errorMsg && (
              <p className="text-red-600 text-sm mt-2">{errorMsg}</p>
            )}
          </CardContent>
        </Card>

        {token && (
          <Card>
            <CardHeader>
              <CardTitle>Token Diperoleh</CardTitle>
              <CardDescription>
                Token berhasil dibuat dan disimpan ke localStorage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                {token}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
