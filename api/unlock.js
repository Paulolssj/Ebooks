import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { key, goto = '/Ebook/index.html' } = req.query;

  // Busca a configuração atualizada ou usa o padrão
  const config = await kv.hgetall('apex_config') || {};
  const MASTER_KEY = config.access_key || 'apex_vip_access_2026_secure';
  const CHECKOUT_URL = config.checkout_url || 'https://lastlink.com/p/CAA303628/checkout-payment/';

  if (key === MASTER_KEY) {
    // Define o cookie de autorização por 1 ano
    res.setHeader('Set-Cookie', 'apex_access_token=authorized_apex_vip; Path=/; Max-Age=31536000; SameSite=Lax');
    return res.redirect(goto);
  } else {
    return res.redirect(CHECKOUT_URL);
  }
}
