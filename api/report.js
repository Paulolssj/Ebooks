import { supabase } from './supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { domain, path, timestamp, original_link } = req.body;
  
  try {
    // Registra o domínio na tabela do Supabase com o link original
    const { error } = await supabase
      .from('apex_clones_log')
      .insert({ 
        domain, 
        path, 
        timestamp: new Date(timestamp),
        original_link: original_link || 'Indeterminado'
      });

    if (error) throw error;
    
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Supabase Error:', err);
    return res.status(500).json({ success: false });
  }
}
