# Documentação de Software

**Sistema:** Codebnb

**Estudante:** stopiglia

**Data:** 16/11/2026

**Número da prova:** 02

Sistema web para mostrar tudo que eu sei.

## Requisitos

### 1.1 Requisitos Funcionais do Sistema

| ID | Requisito | Descrição |
| --- | --- | --- |
| RF01 | Verificar Identidade | O sistema deverá verificar as credenciais do usuário |
| RF02 | Carregar Tela Principal | O sistema deverá exibir a tela principal após a autenticação, apresentando as opções e funcionalidades |
| RF03 | Desconectar Login | O sistema deverá permitir que o usuário saia de sua conta |
| RF04 | Criar Cadastro do Usuário | O sistema deverá permitir que novos usuários realizem seu cadastro, tendo nome, email, senha, etc |
| RF05 | Alterar  Cadastro do usuário | O sistema deverá permitir que o usuário edite e atualize suas informações pessoais cadastradas |
| RF06 | Apagar Cadastro do Usuário | O sistema deverá permitir que o usuário solicite a exclusão de sua conta na plataforma |
| RF07 | Registar Imovel | O sistema deverá permitir que proprietários cadastrem imóveis para aluguel, informando endereço, descrição, valor da diária e características da propriedade |
| RF08 | Corrigir dados do imovel | O sistema deverá permitir que o proprietário altere as informações de um imóvel já cadastrado |
| RF09 | Consultar Imoveis | O sistema deverá permitir que os usuários visualizem os imóveis disponíveis para aluguel na plataforma |
| RF10 | Pesquisar Imoveis | O sistema deverá permitir que o proprietário exclua um imóvel anunciado na plataforma |
| RF11 | Vizualizar Detalhes dos Imoveis | O sistema deverá apresentar informações detalhadas sobre cada imóvel, incluindo fotos, descrição, localização, preço e comodidade |
| RF12 | Cancelar Reserva | O sistema deverá permitir que o usuário cancele uma reserva realizada, respeitando as regras de cancelamento da plataforma |
| RF13 | Consultar Reserva | O sistema deverá permitir que os usuários visualizem suas reservas realizadas e seus respectivos status |
| RF14 | Realizar Reserva | O sistema deverá permitir que os usuários selecionem um imóvel e solicitem uma reserva para um determinado período |
| RF15 | Gerenciar Reserva | O sistema deverá permitir que o proprietário visualize e gerencie as solicitações de reserva de seus imóveis |
| RF16 | Enviar Avaliação | O sistema deverá permitir que usuários avaliem os imóveis após a conclusão de uma estadia |
| RF17 | Visualizar Avaliação | O sistema deverá permitir que os usuários consultem as avaliações feitas por outros hóspedes sobre os imóveis |
| RF18 | Adicionar Imovel a Favoritos | O sistema deverá permitir que os usuários salvem imóveis de seu interesse em uma lista de favoritos |
| RF19 | Recuperar Senha | O sistema deverá permitir que o usuário solicite a recuperação de sua senha por meio do e-mail cadastrado |
| RF20 | Enviar Notificação | O sistema deverá enviar notificações aos usuários sobre confirmações, alterações e cancelamentos de reservas |
| RF21 | Consultar Histórico de Reservas | O sistema deverá permitir que o usuário consulte o histórico de suas reservas anteriores |
| RF22 | Visualizar Imoveis do Proprietário | O sistema deverá permitir que o proprietário visualize todos os imóveis cadastrados em sua conta |


### 1.2 Requisitos Não Funcionais

| ID | Requisito | Descrição |
| --- | --- | --- |
| RNF01 | Proteção de Dados | |
| RNF02 | Integridade dos Dados | |
| RNF03 | Controle de Acesso | |

## 2 Requisitos de Infraestrutura

| Tecnologia | Versão / ambiente |
| --- | --- |
| JavaScript | Node.js 24 |
| Next.js | 16 |
| React e React DOM | 19 |
| bcryptjs | 3 |
| jsonwebtoken | 9 |
| node:crypto | Integrado ao Node.js |
| PostgreSQL | 18 |
| Prisma e Prisma Client | 6 |
| Ant Design | 6 |
