import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { domain, path, timestamp } = req.body;
  
  try {
    // Registra o domínio na lista de clones suspeitos (Vercel KV)
    await kv.lpush('apex_clones_log', JSON.stringify({ domain, path, timestamp }));
    
    // Limita o histórico aos últimos 100
    await kv.ltrim('apex_clones_log', 0, 99);
    
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('KV Error:', err);
    return res.status(500).json({ success: false });
  }
}
