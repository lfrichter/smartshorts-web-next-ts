---
status: permanent
tags: 
date: 2025-08-02
project: 
related: 
prompt: 
Version: "1.0"
---
# Diretrizes para Contribuição no Projeto SmartShorts

Bem-vindo(a) ao projeto SmartShorts\! Agradecemos seu interesse em contribuir. Este documento detalha o processo de contribuição, as diretrizes de desenvolvimento, as tecnologias utilizadas e as melhores práticas para garantir que suas contribuições sejam integradas de forma eficiente e mantenham a alta qualidade do nosso codebase.

## 📝 Sumário

1.  [Visão Geral do Projeto](https://www.google.com/search?q=%231-vis%C3%A3o-geral-do-projeto)
2.  [Arquitetura e Filosofia](https://www.google.com/search?q=%232-arquitetura-e-filosofia)
3.  [Stack de Tecnologia](https://www.google.com/search?q=%233-stack-de-tecnologia)
4.  [Como Contribuir](https://www.google.com/search?q=%234-como-contribuir)
      * [4.1. Configuração do Ambiente](https://www.google.com/search?q=%2341-configura%C3%A7%C3%A3o-do-ambiente)
      * [4.2. Fluxo de Trabalho (Workflow)](https://www.google.com/search?q=%2342-fluxo-de-trabalho-workflow)
      * [4.3. Regras e Boas Práticas de Codificação](https://www.google.com/search?q=%2343-regras-e-boas-pr%C3%A1ticas-de-codifica%C3%A7%C3%A3o)
      * [4.4. Testes](https://www.google.com/search?q=%2344-testes)
      * [4.5. Lidando com Interrupções e Feedback](https://www.google.com/search?q=%2345-lidando-com-interrup%C3%A7%C3%B5es-e-feedback)
5.  [Comunicação](https://www.google.com/search?q=%235-comunica%C3%A7%C3%A3o)
6.  [Licença](https://www.google.com/search?q=%236-licen%C3%A7a)

-----

## 1\. Visão Geral do Projeto

O **SmartShorts** é um SaaS (Software as a Service) para **geração automatizada de vídeos curtos e longos** para redes sociais. Nosso objetivo é fornecer uma ferramenta intuitiva e poderosa para criadores de conteúdo, agências de marketing e influenciadores digitais, permitindo a criação de vídeos a partir de prompts de texto ou roteiros JSON detalhados.

O projeto é dividido em:

  * **Backend (Java/Spring Boot):** Responsável pela lógica de negócio, processamento de jobs de vídeo, integração com APIs externas e persistência de dados.
  * **Frontend (Next.js):** A interface de usuário (UI) para interação com a API de backend, permitindo a criação e monitoramento de jobs de geração de vídeo. (Este repositório foca primariamente na UI).
  * **Outros Clientes:** Um cliente desktop inicial em Electron está planejado.

## 2\. Arquitetura e Filosofia

Adotamos a **Clean Architecture** (com princípios da Arquitetura Hexagonal) como padrão arquitetural principal. Isso garante uma separação clara de interesses, alto desacoplamento e testabilidade, facilitando a evolução e manutenção do sistema.

**Princípios Orientadores:**

  * **Domínio no Centro:** A lógica de negócio é o ativo mais valioso e deve ser independente de frameworks.
  * **Desenvolvimento Local, Deploy na Nuvem:** Ciclo de desenvolvimento rápido usando ferramentas locais (Docker).
  * **Comece Simples, Evolua com Segurança:** Arquitetura "Monolítica Modular" que pode evoluir para microserviços quando necessário.
  * **Qualidade por Design:** Embora não sigamos um TDD estrito, a qualidade é garantida por testes robustos e pela prática de marcar novas funcionalidades para testes futuros.
  * **API Contract-First:** O backend expõe um contrato OpenAPI (Swagger) versionado, garantindo estabilidade para os clientes.

## 3\. Stack de Tecnologia

### 3.1. Backend (SmartShorts API)

  * **Linguagem:** Java 17+
  * **Framework:** Spring Boot 3+
  * **Persistência:** PostgreSQL (Relacional), MinIO/S3 (Objetos), Redis (Cache e Filas de Jobs)
  * **Comunicação Assíncrona:** Inicialmente Spring `@Async`, com migração futura para RabbitMQ
  * **Segurança:** Spring Security + JWT (JSON Web Tokens)
  * **Monitoramento:** Spring Boot Actuator + Micrometer
  * **Integrações Externas:** OpenAI, ElevenLabs, Replicate/Pixabay, FFmpeg

### 3.2. Frontend (SmartShorts UI - Este Projeto)

  * **Framework:** Next.js (com App Router)
  * **Linguagem:** TypeScript
  * **Estilização:** Tailwind CSS
  * **Requisições HTTP:** Axios
  * **Ambiente de Desenvolvimento:** Node.js / npm (ou Yarn)

## 4\. Como Contribuir

Para contribuir com o projeto, siga o fluxo de trabalho e as diretrizes abaixo.

### 4.1. Configuração do Ambiente

Para configurar o ambiente de desenvolvimento para a UI do SmartShorts:

1.  **Pré-requisitos:**

      * [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
      * [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js) ou [Yarn](https://yarnpkg.com/)
      * O backend do SmartShorts (Java/Spring Boot) deve estar em execução e acessível em `http://localhost:8080`.

2.  **Clone o repositório:**

    ```bash
    git clone <URL_DO_SEU_REPOSITORIO_FRONTEND>
    cd smartshorts-ui
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    # ou yarn install
    ```

4.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    # ou yarn dev
    ```

    O aplicativo estará disponível em `http://localhost:3000` (ou outra porta disponível).

### 4.2. Fluxo de Trabalho (Workflow)

Nossas diretrizes de desenvolvimento seguem uma abordagem rigorosa para garantir a qualidade.

1.  **Compreenda o problema profundamente:** Antes de codificar, leia e entenda cuidadosamente o problema ou a feature a ser desenvolvida. Analise os documentos do projeto (`ADR-v3-Arquitetura.md`, `ImplementationPlanV1.md`, `openapi.yaml`) para obter contexto completo.
2.  **Investigue a base de código:** Explore os arquivos relevantes, procure por funções-chave, classes e variáveis para entender como as partes do sistema se conectam. Valide e atualize seu entendimento continuamente.
3.  **Desenvolva um plano de ação claro:** Crie um plano passo a passo, dividindo o trabalho em tarefas gerenciáveis e incrementais. Este plano deve ser detalhado e verificável.
4.  **Implemente de forma incremental:** Faça alterações pequenas e testáveis no código. Antes de prosseguir para a próxima tarefa, certifique-se de que a anterior não introduziu bugs ou quebrou testes.
5.  **Debug conforme necessário:** Em caso de erros, utilize técnicas de depuração (logs, inspeção de estado) para isolar e resolver problemas. Busque identificar a causa raiz, não apenas tratar sintomas.
6.  **Teste frequentemente:** Execute os testes (unitários, integração, E2E) para verificar o funcionamento do sistema. Crie scripts de testes avulsos se necessário para simular a aplicação.

### 4.3. Regras e Boas Práticas de Codificação

  * **Não altere versões de bibliotecas/frameworks:** Mantenha as versões existentes das bibliotecas e frameworks do projeto. Se uma nova funcionalidade exigir uma versão mais recente, discuta com a equipe antes de qualquer alteração.
  * **Instale dependências na última versão:** Ao adicionar novas dependências, use sempre a última versão estável disponível.
  * **Boas Práticas:** Siga os princípios SOLID e as diretrizes de Clean Code. Mantenha o código simples, claro, objetivo e expressivo. Evite complexidades desnecessárias e a criação excessiva de interfaces, mas utilize-as quando houver alto acoplamento.
  * **Não crie arquivos de teste isolados:** Evite criar scripts `.sh`, `makefiles` ou outros arquivos isolados no projeto apenas para testes ou provas de conceito. Integre os testes ao sistema de testes existente.
  * **Contexto da edição:** Sempre leia o conteúdo ou a seção relevante do arquivo antes de fazer qualquer alteração para garantir o contexto completo.
  * **Remova logs e códigos temporários:** Após o debugging, remova todas as instruções de impressão, logs ou códigos temporários utilizados para depuração.

### 4.4. Testes

Nossa estratégia de testes é fundamental para a qualidade do software.

  * **Testes Futuros:** Embora não sigamos um TDD estrito, cada nova funcionalidade, componente ou hook deve ser marcado com um comentário `// TODO: Adicionar teste para esta funcionalidade.` para indicar que um teste precisa ser criado posteriormente.
  * **Testes Unitários:** Cubram o domínio e os casos de uso.
  * **Testes de Integração:** Validem a comunicação entre componentes e com a API.
  * **Testes de Ponta a Ponta (E2E):** Garanta que os fluxos completos da aplicação funcionem como esperado.
  * **Rigurosidade:** Teste seu código rigorosamente, cobrindo todos os casos de borda. Repita os testes várias vezes para capturar todos os edge cases. Uma solução não é perfeita até que todos os testes passem de forma robusta.

### 4.5. Lidando com Interrupções e Feedback

  * **Sempre complete a tarefa:** Não encerre sua ação sem ter solucionado o problema. Se for fazer uma chamada de ferramenta (tool call), certifique-se de realmente fazê-la.
  * **Reflita profundamente:** Planeje extensivamente antes de cada chamada de função e reflita profundamente sobre os resultados das chamadas anteriores. Evite realizar todo o processo apenas com chamadas de função.
  * **Interrupção do Usuário (Você):** Se você for interrompido com uma solicitação ou sugestão, entenda a instrução, realize a ação solicitada, e então, atualize seu plano de ação e continue de onde parou sem retornar o controle.
  * **Dúvidas do Usuário:** Se houver uma dúvida, forneça uma explicação clara passo a passo. Após a explicação, pergunte se deve continuar a tarefa. Se sim, prossiga de forma autônoma.

## 5\. Comunicação

Mantenha uma comunicação clara e concisa em suas Pull Requests e commits. Descreva o que foi feito, por que foi feito e como foi testado.

## 6\. Licença

Este projeto é licenciado sob a licença MIT. Consulte o arquivo `LICENSE` no repositório principal para mais detalhes.
