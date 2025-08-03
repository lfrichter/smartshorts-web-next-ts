// app/api/auth/login/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. Recebe as credenciais do formulário de login (cliente)
    const { username, password } = await request.json();

    // 2. Chama a API Java (servidor-para-servidor)
    const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!apiResponse.ok) {
      // Se a API Java retornar um erro (ex: 401), repassa o erro
      const errorData = await apiResponse.json();
      return NextResponse.json({ error: errorData.message || 'Credenciais inválidas' }, { status: apiResponse.status });
    }

    // 3. Extrai o token da resposta da API Java
    const data = await apiResponse.json();
    const token = data.token;

    if (!token) {
      return NextResponse.json({ error: 'Token não recebido do backend' }, { status: 500 });
    }

    // 4. Cria uma resposta para o navegador e anexa o token em um cookie seguro
    const response = NextResponse.json({ message: 'Login bem-sucedido' });

    response.cookies.set('authToken', token, {
      httpOnly: true, // O cookie não é acessível via JavaScript no navegador
      secure: process.env.NODE_ENV === 'production', // Use https em produção
      sameSite: 'strict', // Proteção CSRF
      path: '/', // O cookie está disponível para todo o site
      maxAge: 60 * 60 * 24 * 7, // 1 semana
    });

    return response;

  } catch (error) {
    console.error('Erro no route handler de login:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
