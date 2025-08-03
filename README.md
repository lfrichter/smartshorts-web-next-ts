# SmartShorts UI - Interface com Next.js

## 📝 Descrição

Este projeto é a interface de usuário (UI) para o **SmartShorts**, um SaaS de geração automatizada de vídeos. Desenvolvido com o framework **Next.js** e **TypeScript**, esta aplicação permite que os usuários se autentiquem e interajam com a API de backend do SmartShorts para criar e monitorar jobs de geração de vídeo.

A UI foi projetada para ser intuitiva, performática e eficiente, permitindo a criação de vídeos a partir de prompts de texto simples ou de estruturas JSON detalhadas, além de oferecer um painel para acompanhar o status de cada job de renderização em tempo real.

## ✨ Tecnologias Utilizadas

  * **Next.js**: Framework React para produção, com renderização híbrida (Server-Side e Client-Side) e foco em performance.
  * **React**: Biblioteca JavaScript para construção de interfaces de usuário reativas.
  * **TypeScript**: Superset do JavaScript que adiciona tipagem estática para maior segurança e clareza do código.
  * **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva.
  * **Axios**: Cliente HTTP baseado em Promises para fazer requisições à API.

## 🚀 Como Executar o Projeto

Para colocar o projeto SmartShorts UI em funcionamento na sua máquina local, siga os passos abaixo.

### Pré-requisitos

Certifique-se de ter os seguintes softwares instalados:

  * [Node.js](https://nodejs.org/en/) (versão 18 ou superior).
  * [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js) ou [Yarn](https://yarnpkg.com/).
  * O backend do SmartShorts (Java/Spring Boot) deve estar em execução e acessível em `http://localhost:8080`.

### Instalação e Execução

1.  **Clone o repositório** (se ainda não o fez):

    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd smartshorts-ui-next
    ```

2.  **Instale as dependências**:

    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento**:

    ```bash
    npm run dev
    ```

    O aplicativo estará disponível em `http://localhost:3000`.

## 📊 Endpoints da API Consumidos

A interface interage com os seguintes endpoints da API de backend, que está configurada com uma `baseURL` de `http://localhost:8080/api/v1`:

| Endpoint         | Método HTTP | Descrição                                                |
| :--------------- | :---------- | :------------------------------------------------------- |
| `/auth/register` | `POST`      | Registra um novo usuário no sistema.                     |
| `/auth/login`    | `POST`      | Autentica um usuário e retorna um token JWT.             |
| `/jobs/prompt`   | `POST`      | Cria um novo `RenderJob` a partir de um prompt de texto. |
| `/jobs/upload`   | `POST`      | Cria um novo `RenderJob` a partir de uma estrutura JSON. |
| `/jobs/{jobId}`  | `GET`       | Consulta o status atual de um `RenderJob` específico.    |

## 📐 Estrutura do Projeto

A estrutura de pastas segue o padrão do **App Router** do Next.js:

```bash
.
├── app/
│   ├── api/             # Route Handlers (nossa API de proxy)
│   │   └── auth/
│   ├── login/           # Rota /login
│   │   └── page.tsx
│   ├── register/        # Rota /register
│   │   └── page.tsx
│   ├── layout.tsx       # Layout raiz da aplicação
│   └── page.tsx         # Página principal (dashboard)
├── components/          # Componentes reutilizáveis (e.g., JobCreator)
├── hooks/               # Hooks customizados (e.g., useJobPolling)
├── services/            # Lógica de comunicação com a API (apiService.js)
├── types/               # Definições de tipos TypeScript
└── middleware.ts        # Middleware para proteção de rotas
```

## 🛣️ Plano de Migração

Este projeto é o resultado de uma migração de uma SPA React/Vite para Next.js/TypeScript. O plano de desenvolvimento detalhado para esta migração pode ser encontrado em `docs/ImplementationPlanV1.md`. As principais fases foram:

  * **Fase 0: Configuração e Base do Projeto**: Inicialização do projeto Next.js com TypeScript.
  * **Fase 1: Migração da UI e Estrutura de Rotas**: Adaptação dos componentes e uso do App Router.
  * **Fase 2: Re-arquitetura da Autenticação**: Implementação de autenticação server-side com cookies e middleware.
  * **Fase 3: Migração da Lógica Principal**: Adaptação dos componentes interativos e hooks.

## 🤝 Contribuição

Contribuições são muito bem-vindas\! Antes de contribuir, por favor, leia nossas diretrizes detalhadas no arquivo `docs/CONTRIBUTING.md`.

## 📄 Licença

Este projeto é licenciado sob a licença MIT.
