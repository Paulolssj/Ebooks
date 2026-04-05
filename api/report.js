import { supabase } from './supabase.js';

export default async function handler(req, res) {
  console.log('--- REPORT HANDLER START ---');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!supabase) {
      throw new Error('Supabase client not initialized. Check supabase.js and environment variables.');
    }

    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        console.error('Failed to parse body string:', body);
      }
    }

    const { domain, path, timestamp, original_link } = body || {};

    if (!domain) {
      return res.status(400).json({ 
        success: false, 
        error: 'Domain is required', 
        receivedBody: body 
      });
    }

    // Garantir que a data seja válida
    let lastSeenDate = new Date();
    if (timestamp) {
      const d = new Date(timestamp);
      if (!isNaN(d.getTime())) {
        lastSeenDate = d;
      }
    }

    console.log('Attempting Supabase Insert for domain:', domain);

    const { data, error } = await supabase
      .from('apex_clones_log')
      .insert({ 
        domain: domain, 
        path: path || '/', 
        last_seen: lastSeenDate.toISOString(),
        original_link: original_link || 'Indeterminado'
      })
      .select();

    if (error) {
      console.error('Supabase Insert Error:', error);
      return res.status(500).json({ 
        success: false, 
        error_type: 'DATABASE_ERROR',
        message: 'Falha ao registrar no banco de dados'
      });
    }

    console.log('Insert Successful:', data);
    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Global Catch in report.js:', err);
    return res.status(500).json({ 
      success: false, 
      error_type: 'SERVER_ERROR',
      message: 'Ocorreu um erro interno no servidor'
    });
  }
}
