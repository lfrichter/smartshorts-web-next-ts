---
status: permanent
tags: 
date: 2025-08-02
project: 
related: "[[Project Next e Typescript]]"
prompt: 
Version: "1.0"
---
### **Checklist de Migração para Next.js com TypeScript**

#### **Fase 0: Configuração e Base do Projeto**

  * `[ ]` **1. Inicializar o Projeto com TypeScript**

      * `[ ]` Executar o comando `npx create-next-app@latest`.
      * `[ ]` Responder `Yes` para a pergunta sobre o uso de TypeScript na inicialização.

  * `[ ]` **2. Definir Tipos Compartilhados**

      * `[ ]` Criar o arquivo `types/index.ts` com as interfaces `Job` e `Segment`.
        ```typescript
        // types/index.ts
        export interface Segment {
          order: number;
          timeBegin: number;
          timeEnd: number;
          subtitle: string;
          imagePrompt: string;
          movement: string;
          verticalOffset: number;
        }

        export interface Job {
          jobId: string;
          status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'SCHEDULED' | 'PUBLISHED';
          createdAt: string;
          lastUpdatedAt?: string;
        }
        ```

  * `[ ]` **3. Migrar Componentes Iniciais**

      * `[ ]` Copiar a pasta de componentes do projeto antigo.
      * `[ ]` Renomear todos os arquivos de `.jsx` para `.tsx`.

#### **Fase 1: Estrutura de Rotas e UI com Tipagem**

  * `[ ]` **1. Configurar o Layout Raiz Tipado (`app/layout.tsx`)**

      * `[ ]` Garantir a tipagem correta da prop `children` no `RootLayout`.
        ```typescript
        export default function RootLayout({
          children,
        }: {
          children: React.ReactNode
        }) {
          // ...
        }
        ```

  * `[ ]` **2. Criar e Tipar as Páginas**

      * `[ ]` Criar a estrutura de pastas e arquivos para as rotas (ex: `app/login/page.tsx` e `app/register/page.tsx`).
      * `[ ]` Adicionar a diretiva `"use client"` no topo dos componentes interativos.
      * `[ ]` Adicionar a tipagem para as props em todos os componentes migrados (ex: `function JobCreator({ onJobCreated }: { onJobCreated: (jobId: string) => void })`).

#### **Fase 2: Lógica de Cliente com Tipagem**

  * `[ ]` **1. Implementar Tipagem no Estado (`useState`)**

      * `[ ]` Usar tipos genéricos no `useState` para estados complexos.
        ```typescript
        import { Job } from '@/types';
        const [jobs, setJobs] = useState<Job[]>([]);
        ```

  * `[ ]` **2. Tipar Hooks Customizados**

      * `[ ]` Adicionar tipos para os parâmetros do hook `useJobPolling`.
        ```typescript
        import { Job } from '@/types';

        function useJobPolling(jobs: Job[], setJobs: React.Dispatch<React.SetStateAction<Job[]>>) {
          // ...
        }
        ```

#### **Fase 3: Autenticação Segura com TypeScript**

  * `[ ]` **1. Criar Route Handlers Tipados para Autenticação**

      * `[ ]` Implementar os arquivos `app/api/auth/[...]/route.ts` usando os tipos `Request` e `NextResponse`.
        ```typescript
        import { NextResponse } from 'next/server';

        export async function POST(request: Request) {
          // ...
        }
        ```

  * `[ ]` **2. Implementar o Middleware de Autenticação Tipado**

      * `[ ]` Criar o arquivo `middleware.ts` na raiz do projeto com a lógica de verificação de cookie e redirecionamento, utilizando os tipos `NextRequest` e `NextResponse`.
        ```typescript
        import { NextResponse } from 'next/server'
        import type { NextRequest } from 'next/server'

        export function middleware(request: NextRequest) {
          // ...
        }
        ```

#### **Fase 4: Finalização e Testes**

  * `[ ]` **1. Migrar os Testes Existentes**

      * `[ ]` Renomear os arquivos de teste para a extensão `.test.tsx`.
      * `[ ]` Executar os testes e garantir que todos passam no novo ambiente.

  * `[ ]` **2. Realizar a Limpeza do Projeto**

      * `[ ]` Remover dependências que não são mais necessárias (ex: `react-router-dom`).
      * `[ ]` Executar o verificador de tipos do TypeScript para garantir que não há erros pendentes.
