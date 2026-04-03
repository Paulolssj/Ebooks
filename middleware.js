import { next } from '@vercel/edge';

export default function middleware(req) {
  const { pathname } = new URL(req.url);

  // Protege as pastas de Ebook
  if (pathname.startsWith('/Ebook/') || pathname.startsWith('/Ebook2/')) {
    // Busca o cookie de autorização
    const cookies = req.headers.get('cookie') || '';
    const hasAccess = cookies.includes('apex_access_token=authorized_apex_vip');
    
    // Se o cookie não existir ou for inválido, redireciona para o checkout
    if (!hasAccess) {
      const checkoutUrl = 'https://lastlink.com/p/CAA303628/checkout-payment/';
      return Response.redirect(new URL(checkoutUrl, req.url));
    }
  }

  return next();
}

export const config = {
  matcher: ['/Ebook/:path*', '/Ebook2/:path*'],
};
