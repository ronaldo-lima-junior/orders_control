# API para controle de PEDIDOS

Este é o backend da aplicação, responsável pela gestão de usuários, produtos, pedidos e integração com o sistema de pagamento Asaas.

## Pré-requisitos

* Node.js (v18 ou superior recomendado)
* PNPM (Gerenciador de pacotes)
* Docker e Docker Compose (para rodar o banco de dados PostgreSQL)
* Uma conta e API Key do Asaas (Sandbox ou Produção)

## Passos para Rodar o Projeto

1.  **Clonar o Repositório (se ainda não o fez):**
    ```bash
    git clone <url_do_repositorio>
    cd <diretorio_do_repositorio>/prova
    ```

2.  **Instalar Dependências:**
    Na raiz do diretório `prova`, instale as dependências de todos os workspaces:
    ```bash
    pnpm install
    ```

3.  **Configurar Variáveis de Ambiente:**
    * Navegue até o diretório do backend: `cd packages/backend/main`
    * Copie o arquivo de exemplo: `cp .env.example .env`
    * Edite o arquivo `.env` e preencha as variáveis, **especialmente**:
        * `JWT_SECRET`: Um secret para ser utilizado nos tokens JWT.
        * `TOKEN_ASAAS`: Sua chave de API do Asaas.
        * `URL_ASAAS`: URL da API do Asaas (Sandbox ou Produção).

4.  **Iniciar Banco de Dados (Usando Docker Compose):**
    Na raiz do diretório `prova`:
    ```bash
    docker compose up -d
    ```
    *Nota: Se for a primeira vez, pode demorar um pouco para baixar a imagem do Postgres.*

5.  **Rodar Migrations:**
    Ainda no diretório `packages/backend/main`, execute as migrations para criar as tabelas no banco:
    ```bash
    pnpm typeorm migration:run
    ```

6.  **Iniciar a Aplicação:**
    Finalmente, inicie o servidor de desenvolvimento:
    ```bash
    pnpm dev
    ```
    A API estará rodando na porta definida em `.env` (padrão 3333).

## Instruções de Autenticação

* A autenticação é feita via **JWT (JSON Web Tokens)**.
* Para obter um token, faça uma requisição `POST` para o endpoint `/sessions/login` com `email` e `password` no corpo da requisição.
* Se as credenciais forem válidas, a API retornará um `token`.
* Para acessar rotas protegidas (como as de `products` e `orders`), inclua o token no header `Authorization` como `Bearer <seu_token>`.
* O middleware `Authenticate.ts` valida o token em rotas protegidas.

## Integração com Serviço Externo (Asaas)

* **Objetivo:** Integração com o Asaas para criação de clientes e geração de cobranças (pagamentos) para os pedidos.
* **Configuração:** As credenciais (`TOKEN_ASAAS`, `URL_ASAAS`) são definidas no arquivo `.env`.
* **Provedor:** A lógica de comunicação com a API do Asaas está encapsulada em `src/shared/providers/AsaasProvider`. Ele utiliza `axios` para fazer as requisições HTTP.
* **Uso:**
    * **Criação de Cliente:** O `CreateOrderItemsUseCase` utiliza o `AsaasProvider` para cadastrar clientes que não possuam o ID do Asaas no registro do banco de dados, após feito o cadastro o registro é atualizado
    * **Geração de Cobrança:** O `CreateOrderItemsUseCase` utiliza o `AsaasProvider` para gerar uma cobrança após atualizar o pedido para `ENVIADO`. Com a cobrança criada, o registro no banco de dados é atualizado com o  `paymentId` da plataforma.
    * **Webhook:** Há um webhook (`POST /webhook/asaas/billing`) para receber notificações de pagamento, estorno e cancelamento do Asaas.

## Estrutura de pastas

* A estrutura de pastas do projeto segue uma abordagem modular e orientada a domínios, com separação de responsabilidades:
    * `src/@types`: Contém arquivos de definição de tipos TypeScript (.d.ts) para estender ou modificar tipos existentes de bibliotecas, como adicionar propriedades customizadas ao objeto Request do Express.
    * `src/config`: Armazena arquivos de configuração para diferentes aspectos da aplicação, como a conexão com o banco de dados, integração com serviços externos (Asaas), e configurações gerais.
    * `src/modules`: É a parte principal da aplicação, dividia por domínios de negócio (funcionalidades principais). Cada módulo contém subpastas com resposabilidades específicas:
        * `infra`: Implementações relacionadas à infraestrutura do módulo, como as rotas, middlewares e os controllers. Nesta pasta também se encontram os repositórios e mappers do TypeORM.
        * `repositories`: Define as interfaces e os DTOs usados para comunicação com os repositórios
        * `useCases`: Contém a lógica de negócio principal da aplicação, organizada por casos de uso.
    * `src/shared`: Contém o código que é reutilizado por vários módulos, evitando a duplicação de código.
        * `adapters`: Abstrações e implementações para recursos que podem ser utilizados em diferentes partes do sistema
        * `core`: Arquivos fundamentais para arquitetura, como classes base e tipos compartilhados.
        * `entities`: Definições das entidades de negócio principais que podem ser usadas por outros modulos.
        * `errors`: Classes de erro customizadas que são usadas em toda a aplicação.
        * `helpers`: Funções genéricas úteis usadas na aplicação.
        * `infra`: Código da infraestutura compartilhada por toda a aplicação.
            * `database`: Configuração da conexão principal com o banco de dados
            * `http`: Configuração do Express e middlewares globais
        * `providers`: Abstrações e implementações para serviços de terceiros.
        
```
└── 📁src
    └── 📁@types
        ├── express.d.ts
    └── 📁config
        ├── general.ts
    └── 📁modules
        └── 📁modulo
            └── 📁infra
                └── 📁http
                    └── 📁controllers
                        ├── ModuloController.ts
                    └── 📁middlewares
                        └── 📁validations
                            ├── ModuloController.ts
                    └── 📁routes
                        ├── index.ts
                        ├── modulo.routes.ts
                └── 📁typeorm
                    └── 📁mappers
                        ├── ModuloMapper.ts
                    └── 📁repositories
                        ├── ModuloDatabaseRepository.ts
            └── 📁repositories
                └── 📁dtos
                    └── 📁create
                        ├── InputData.ts
                    └── 📁update
                        ├── InputData.ts
                ├── IModuloRepository.ts
            └── 📁useCases
                └── 📁createModulos
                    ├── DatabaseFactory.ts
                    ├── IAbstractFactory.ts
                    ├── index.ts
                    ├── InputData.ts
                    ├── test.spec.ts
    └── 📁shared
        └── 📁adapters
            └── 📁database
                ├── IDatabaseAdapter.ts
                ├── index.ts
        └── 📁core
            ├── ResponseError.ts
        └── 📁entities
            └── 📁entidade
                ├── entidade.ts
        └── 📁errors
            ├── Errors.ts
        └── 📁helpers
            ├── CaughtError.ts
        └── 📁infra
            └── 📁database
                └── 📁typeorm
                    └── 📁migrations
                        ├── 1761050583693-exemplo.ts
                    ├── adapter.ts
                    ├── source.ts
            └── 📁http
                └── 📁middlewares
                    ├── middleware.ts
                └── 📁routes
                    ├── index.ts
                ├── index.ts
            ├── server.ts
        └── 📁providers
            └── 📁ProviderExemplo
                └── 📁dtos
                    └── 📁generate
                        ├── InputData.ts
                        ├── OutputData.ts
                ├── IProviderExemplo.ts
                ├── implementations.ts
```
