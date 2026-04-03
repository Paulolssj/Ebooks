import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { password, action, payload } = req.body;

  // AUTH: Senha básica de administrador
  const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'apex_admin_2024';
  
  if (password !== ADMIN_PASS) {
    return res.status(401).json({ error: 'Acesso Negado' });
  }

  try {
    if (action === 'GET_CONFIG') {
      const config = await kv.hgetall('apex_config') || {
        checkout_url: 'https://lastlink.com/p/CAA303628/checkout-payment/',
        access_key: 'apex_vip_access_2024_secure',
        official_domain: ''
      };
      const logs = await kv.lrange('apex_clones_log', 0, 49) || [];
      return res.status(200).json({ config, logs });

    } else if (action === 'UPDATE_CONFIG') {
      await kv.hset('apex_config', payload);
      return res.status(200).json({ success: true, message: 'Configurações Atualizadas' });
    }

    return res.status(400).json({ error: 'Ação Inválida' });
  } catch (err) {
    console.error('KV Error:', err);
    return res.status(500).json({ error: 'Erro no Banco de Dados' });
  }
}
