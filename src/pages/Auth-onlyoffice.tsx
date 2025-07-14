//AUTH ONLY OFFICE
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogIn } from "lucide-react";
import CryptoJS from "crypto-js";

export default function AuthOnlyOffice() {
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const codeFromUrl = params.get("code");
    setCode(codeFromUrl);

    if (codeFromUrl) {
      console.log("Kode dari URL:", codeFromUrl);
      const codeVerifier = sessionStorage.getItem("onlyoffice_code_verifier");

      if (codeVerifier) {
        // TODO: tukar code + codeVerifier ke access_token
        console.log("Code Verifier:", codeVerifier);
    const NUM_OF_BYTES = 36;
    const codeVerifier2 = CryptoJS.lib.WordArray.random(NUM_OF_BYTES).toString();
    const hashed = CryptoJS.SHA256(codeVerifier2);
    const base64 = CryptoJS.enc.Base64.stringify(hashed)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    // sessionStorage.setItem("onlyoffice_code_verifier", codeVerifier);
    console.log(base64,'base64');


      }
    }


  }, [location.search]);

  const handleLogin = () => {
    const clientId = "96c503ce-b8c3-44f2-aba5-f499a5b65be6"; // ganti dengan client_id dari OnlyOffice
    const redirectUri = "https://koperasiku.vercel.app/auth-onlyoffice";

    

    const oauthUrl = `https://oauth.onlyoffice.com/oauth2/authorize?response_type=code&client_id=a8a9191c-c63b-40ae-9505-33688524d86d&redirect_uri=https://koperasiku.vercel.app/auth-onlyoffice&scope=files:write%20accounts:write%20files:read%20openid%20rooms:read%20accounts.self:read%20accounts:read%20accounts.self:write%20rooms:write&code_challenge_method=S256&code_challenge=iAg86e1ZB2H5Gq4rF48vCpScwIFE7-TSQtTIyeqBLuI`;

    window.location.href = oauthUrl;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Login OnlyOffice</CardTitle>
            <CardDescription>
              Login menggunakan OAuth2 PKCE flow (code_challenge S256)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleLogin} className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              Login dengan OnlyOffice (PKCE)
            </Button>

            {code && (
              <p className="text-sm text-gray-700">
                Kode dari URL: <strong>{code}</strong>
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
