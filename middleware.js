import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Protege as pastas de Ebook
  if (pathname.startsWith('/Ebook/') || pathname.startsWith('/Ebook2/')) {
    const accessCookie = req.cookies.get('apex_access_token');
    
    // Se o cookie não existir ou for inválido, redireciona para o checkout
    if (!accessCookie || accessCookie.value !== 'authorized_apex_vip') {
      const checkoutUrl = 'https://lastlink.com/p/CAA303628/checkout-payment/';
      return NextResponse.redirect(new URL(checkoutUrl, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/Ebook/:path*', '/Ebook2/:path*'],
};
