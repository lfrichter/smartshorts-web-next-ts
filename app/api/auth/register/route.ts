// app/api/auth/register/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. Recebe as credenciais do formulário de registro (cliente)
    const { username, password } = await request.json();

    // 2. Chama a API Java para registrar o novo usuário
    const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await apiResponse.json();

    // 3. Se a API Java retornar um erro (ex: usuário já existe), repassa o erro
    if (!apiResponse.ok) {
      return NextResponse.json({ error: data.message || 'Falha no registro' }, { status: apiResponse.status });
    }

    // 4. Se o registro for bem-sucedido, retorna uma mensagem de sucesso para o cliente
    return NextResponse.json(data, { status: 201 });

  } catch (error) {
    console.error('Erro no route handler de registro:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
