# CodeBnB

Sistema web de aluguel de imóveis (estilo Airbnb) feito com **Next.js 16**, **React 19**,
**Prisma 6**, **PostgreSQL 18** e **Ant Design 6**.

Este README registra o passo a passo do que já foi feito no projeto, na ordem em que aconteceu.

---

## Passo a passo do desenvolvimento

### 1. Projeto base e dependências (08:03 – 08:04)

- Copiei o template do projeto (estrutura `src/`, `anexos/`, `biome.json`, `jsconfig.json` etc.).
- Configurei o [package.json](package.json) com nome `codebnb`, autor e os scripts:
  - `npm run dev`: sobe o Next.js
  - `npm run bd`: recria o banco de dados (ver passo 5)
  - `npm run entrega`: gera a entrega
- Instalei as dependências:

```bash
npm install
```

### 2. Documentação de requisitos (até 08:50)

Escrevi o [documentacao.md](documentacao.md) com:

- **22 requisitos funcionais (RF01 a RF22)**: login/logout, CRUD de usuário, cadastro e
  consulta de imóveis, reservas (realizar, cancelar, consultar, gerenciar, histórico),
  avaliações, favoritos, recuperação de senha e notificações.
- **Requisitos não funcionais (RNF01 a RNF03)**: proteção de dados, integridade e controle
  de acesso *(as descrições ainda estão em branco)*.
- **Requisitos de infraestrutura**: tabela com as tecnologias e versões usadas.

### 3. Variáveis de ambiente (08:54)

Criei o `.env` a partir do [.env.example](.env.example):

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:PORTA/NOME_db"
JWT_SECRET="troque-por-um-texto-secreto"
CRIPTO_CHAVE="troque-por-outro-texto-secreto"
```

- `DATABASE_URL`: conexão com o PostgreSQL
- `JWT_SECRET`: assina o token de login
- `CRIPTO_CHAVE`: chave usada para criptografar dados sensíveis (o CPF)

> O `.env` não vai para o Git (já está no `.gitignore`).

### 4. Modelagem do banco (09:26)

Modelei as tabelas em [prisma/schema.prisma](prisma/schema.prisma):

| Tabela    | Campos principais                                                       | Relação                    |
| --------- | ----------------------------------------------------------------------- | -------------------------- |
| `usuario` | `nome` (único), `senha` (hash bcrypt)                                   | —                          |
| `cliente` | `nome`, `cpf` (único, **criptografado**)                                | 1 cliente → N imóveis      |
| `imovel`  | `nome`, `qtd_comodo`, `qtd_hospede`, `avaliacao` (opcional), `valor`    | N imóveis → 1 cliente      |
| `alguel`  | `data_inicio`, `data_fim`, `valor_total`                                | N aluguéis → 1 imóvel      |

> ⚠️ O model do aluguel está escrito como `alguel` (sem o "u"). Se for corrigir para
> `aluguel`, troque também no `imovel` (`alugueis alguel[]`) e no `seed.js`.

### 5. Dados iniciais / seed (09:28)

Preenchi o [prisma/seed.js](prisma/seed.js) com 3 registros por tabela:

- **usuario**: `admin` / `admin123`, `Yasmin` / `123456`, `João` / `123456`
  (senhas salvas com `bcrypt.hashSync`)
- **cliente**: Ana Souza, Pietro Stopiglia, Tyler Joseph (CPF salvo com `criptografar()`)
- **imovel**: Casa Guarujá, Casa Monte Verde, Casa Campos do Jordão
- **alguel**: um aluguel para cada imóvel (junho, julho e agosto de 2024)

O seed apaga tudo antes (`TRUNCATE ... RESTART IDENTITY CASCADE`) e insere de novo, na ordem
da lista.

### 6. Criação do banco (09:29)

Rodei:

```bash
npm run bd
```

O script [anexos/bd.js](anexos/bd.js) faz, em ordem:

1. Carrega o `.env`
2. `npx prisma generate` (gera o Prisma Client)
3. Conecta no PostgreSQL
4. `DROP` + `CREATE DATABASE` (recria o banco do zero)
5. `npx prisma db push` (cria as tabelas a partir do schema)
6. Roda o `prisma/seed.js` (popula as tabelas)
7. Abre o pgAdmin e mostra como gerar o DER (`der.png`)

### 7. Criptografia do CPF (09:44, **onde estou agora**)

Implementei o [src/lib/cripto.js](src/lib/cripto.js) com **AES-256-CBC** (`node:crypto`):

- A `CRIPTO_CHAVE` passa por **SHA-512**, que gera 64 bytes:
  - bytes `0–32` → **chave** (256 bits)
  - bytes `32–48` → **IV** (16 bytes)
- `criptografar(texto)`: texto em `utf8` → texto cifrado em `hex`
- `descriptografar(texto)`: texto cifrado em `hex` → texto original em `utf8`

> Como o `cripto.js` foi finalizado **depois** do último `npm run bd`, rode `npm run bd` de
> novo para garantir que os CPFs do seed foram gravados com a versão final da criptografia.

---

## Próximos passos

- [ ] Rodar `npm run bd` de novo (por causa do passo 7)
- [ ] Gerar o DER no pgAdmin e salvar como `der.png`
- [ ] Preencher as descrições dos RNF01–RNF03 no `documentacao.md`
- [ ] Adaptar as telas e actions genéricas para as tabelas reais:
  - `src/actions/entidade1.js`, `entidade2.js`, `entidade3.js`
  - `src/app/entidade1/`, `entidade2/`, `entidade3/`
  - (ex.: entidade1 → cliente, entidade2 → imóvel, entidade3 → aluguel)
- [ ] Ajustar o [Header](src/components/Header.jsx) com os links das novas páginas
- [ ] Usar `descriptografar()` para mostrar o CPF na tela de clientes
- [ ] Testar o login (`src/actions/login.js`) com os usuários do seed

---

## Como rodar

```bash
npm install      # instala as dependências
# crie o .env a partir do .env.example
npm run bd       # cria e popula o banco
npm run dev      # abre em http://localhost:3000
```
