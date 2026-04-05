import { supabase } from './supabase.js';

export default async function handler(req, res) {
  const { password, action, payload } = req.body;

  // AUTH: Senha básica de administrador (Hardcoded para garantir acesso 2026)
  const ADMIN_PASS = 'apex_admin_2026';
  
  if (password !== ADMIN_PASS) {
    return res.status(401).json({ error: 'Acesso Negado' });
  }

  try {
    if (action === 'GET_CONFIG') {
      // 1. Busca Configuração Base
      const { data: configData } = await supabase
        .from('apex_config')
        .select('value')
        .eq('key', 'main_config')
        .single();

      // 2. Busca Logs de Clones (últimos 50) com as novas colunas
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
      return res.status(200).json({ success: true, message: `Hijack ${status ? 'ativado' : 'desativado'}` });

    } else if (action === 'UPDATE_CONFIG') {
      const { error } = await supabase
        .from('apex_config')
        .upsert({ key: 'main_config', value: payload, updated_at: new Date() });

      if (error) throw error;
      return res.status(200).json({ success: true, message: 'Configurações Atualizadas no Supabase' });
    }

    return res.status(400).json({ error: 'Ação Inválida' });
  } catch (err) {
    console.error('Supabase Error:', err);
    return res.status(500).json({ error: 'Erro no Banco de Dados Supabase' });
  }
}
