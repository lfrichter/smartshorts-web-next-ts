// middleware.ts

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Esta função será chamada para cada requisição que corresponder ao 'matcher'
export function middleware(request: NextRequest) {
  // 1. Pega o token do cookie da requisição
  const token = request.cookies.get('authToken')?.value;

  // 2. Se não houver token, e o usuário não estiver tentando acessar uma página pública,
  //    redireciona para a página de login.
  if (!token) {
    // A URL atual que o usuário está tentando acessar
    const requestedPath = request.nextUrl.pathname;

    // Lista de caminhos que não precisam de autenticação
    const publicPaths = ['/login', '/register'];

    // Se o caminho solicitado não estiver na lista de caminhos públicos, redirecione
    if (!publicPaths.includes(requestedPath)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 3. Se houver um token, ou se a rota for pública, permite que a requisição continue
  return NextResponse.next();
}

// O 'matcher' define em quais rotas o middleware será executado.
// Isso evita que ele rode em arquivos estáticos desnecessários (_next, etc.).
export const config = {
  matcher: [
    /*
     * Corresponde a todos os caminhos de requisição, exceto para:
     * - Rotas da API
     * - Arquivos estáticos (_next/static)
     * - Arquivos de imagem (_next/image)
     * - Ícone de favicon
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
