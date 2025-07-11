import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { verify } from 'https://deno.land/x/djwt@v2.8/mod.ts'

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

    // Create HMAC key for JWT verification
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(ONLYOFFICE_JWT_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign", "verify"],
    );

    // Get callback data from OnlyOffice
    const callbackData = await req.json();
    console.log('OnlyOffice callback received:', callbackData);

    // Verify JWT token if present
    const authHeader = req.headers.get('AuthorizationJwt');
    if (authHeader) {
      try {
        await verify(authHeader, key);
      } catch (error) {
        console.error('JWT verification failed:', error);
        return new Response('Unauthorized', { 
          status: 401,
          headers: corsHeaders 
        });
      }
    }

    // Handle different callback statuses
    // Status 1: Document is ready for editing
    // Status 2: Document is ready for saving  
    // Status 3: Document saving error
    // Status 4: Document closed with no changes
    // Status 6: Document is being edited
    // Status 7: Error occurred while force saving

    if (callbackData.status === 2) {
      // Document is ready for saving
      const { key, url, users } = callbackData;
      
      // Extract document ID from key
      const documentIdMatch = key.match(/doc-(\d+)-/);
      if (!documentIdMatch) {
        throw new Error('Invalid document key format');
      }
      
      const documentId = parseInt(documentIdMatch[1]);

      // Initialize Supabase client with service role key for backend operations
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );

      // Download document content from OnlyOffice
      const docResponse = await fetch(url);
      if (!docResponse.ok) {
        throw new Error('Failed to download document from OnlyOffice');
      }

      const docContent = await docResponse.text();

      // Update document in database
      const { error: updateError } = await supabaseClient
        .from('dokumen_eoffice')
        .update({
          konten_dokumen: docContent,
          updated_at: new Date().toISOString(),
        })
        .eq('id', documentId);

      if (updateError) {
        throw new Error(`Failed to update document: ${updateError.message}`);
      }

      console.log(`Document ${documentId} saved successfully`);
    }

    // Return success response to OnlyOffice
    return new Response(JSON.stringify({ error: 0 }), {
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders
      },
    });

  } catch (error) {
    console.error('Error in save document callback:', error);
    
    // Return error response to OnlyOffice
    return new Response(JSON.stringify({ error: 1 }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        ...corsHeaders
      },
    });
  }
});