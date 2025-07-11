import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { create, getNumericDate } from 'https://deno.land/x/djwt@v2.8/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get JWT secret from environment
    const ONLYOFFICE_JWT_SECRET = Deno.env.get('ONLYOFFICE_JWT_SECRET');
    if (!ONLYOFFICE_JWT_SECRET) {
      throw new Error('ONLYOFFICE_JWT_SECRET not configured');
    }

    // Create HMAC key for JWT signing
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(ONLYOFFICE_JWT_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign", "verify"],
    );

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Verify user authentication
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response('Unauthorized', { 
        status: 401,
        headers: corsHeaders 
      });
    }

    // Get request data
    const { documentId, documentTitle } = await req.json();
    
    let document = null;
    
    // If documentId exists, get document from database
    if (documentId) {
      const { data: docData, error: docError } = await supabaseClient
        .from('dokumen_eoffice')
        .select('*')
        .eq('id', documentId)
        .single();

      if (docError || !docData) {
        return new Response('Document not found', { 
          status: 404,
          headers: corsHeaders 
        });
      }
      document = docData;
    }

    // Create unique document key
    const documentKey = documentId ? `doc-${documentId}-${Date.now()}` : `draft-${user.id}-${Date.now()}`;
    
    // Create callback URL for saving
    const callbackUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/save-document-callback`;

    // Create configuration object for the React component
    const payload = {
      document: {
        fileType: 'docx',
        key: documentKey,
        title: documentTitle || (document ? document.judul : 'Dokumen Baru'),
        url: document && document.konten_dokumen ? `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${btoa(document.konten_dokumen)}` : '',
      },
      documentType: 'word',
      editorConfig: {
        callbackUrl: callbackUrl,
        user: {
          id: user.id,
          name: user.email,
        },
        mode: 'edit',
        lang: 'id',
        customization: {
          autosave: true,
        },
      },
      exp: getNumericDate(60 * 60), // Token expires in 1 hour
    };

    // Create JWT token
    const jwt = await create({ alg: "HS256", typ: "JWT" }, payload, key);

    // Return configuration with token
    const config = {
      ...payload,
      token: jwt,
      documentServerUrl: 'http://31.97.63.26:8080',
    };

    console.log('Generated OnlyOffice config for document:', documentId);

    return new Response(JSON.stringify(config), {
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders
      },
    });

  } catch (error) {
    console.error('Error generating OnlyOffice config:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders
      },
    });
  }
});