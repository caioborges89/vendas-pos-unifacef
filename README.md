<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descrição

Utilizado [Nest](https://github.com/nestjs/nest) framework TypeScript para o desenvolvimento do projeto.

## Problema
Lídia Maria, uma nova cliente em potencial de Raimundo (nossa persona desenvolvedor), o procura para o desenvolvimento de uma nova plataforma de vendas. Lídia Maria necessita de uma plataforma menos sofistacada, e que atenda as necessidades para com os seus clientes, com um simples cadastro de clientes/usuários, produtos com categoria, e fechamento de pedido. Raimundo, logo mapeou a necessidade de Lídia Maria e logo apresentou sobre camada de serviços e integrações via API, e as vantagens de escala para seu negócio que essa abordagem oferece. Raimundo enviou o seguite contrato para Lídia Maria.

## Contrato

### Cadastro de clientes / usuários

**rotas**

| Rota | Pública |
| - | - |
| Lista   | Não |
| Detalhe | Não |
| Novo    | Sim |
| Editar  | Não |
| Excluir | Não |
| Login   | Sim |

**Campos**

| Campo | Obrigatório | Validação |
| - | - | - |
| Nome        | Sim | min 3 caracteres |
| CPF ou CNPJ | Sim | cpf ou cnpj, unique |
| E-mail      | Sim | email, unique |
| Senha       | Sim | min 6 caracteres |

### Cadastro de categorias

**Campos**

| Campo | Obrigatório | Validação |
| - | - | - |
| Descrição | Sim | min 3 caracteres |

**Rotas**

| Rota | Pública | Filtros |
| - | - | - |
| Lista   | Não | |
| Detalhe | Não | |
| Novo    | Não | |
| Editar  | Não | |
| Excluir | Não | |

### Cadastro de produtos

**Rotas**

| Rota | Pública | Filtros |
| - | - | - |
| Lista   | Sim | Descrição do produto, ID categoria |
| Detalhe | Sim | |
| Novo    | Não | |
| Editar  | Não | |
| Excluir | Não | |

**Campos**

| Campo | Obrigatório | Validação |
| - | - | - |
| Descrição  | Sim | min 3 caracteres |
| Quantidade | Sim | numérico |
| Valor      | Sim | numérico |
| Categoria  | Sim | |

### Pedidos

**Rotas**

| Rota | Pública | Filtros |
| - | - | - |
| Lista   | Não | ID usuário |
| Detalhe | Não | |
| Novo    | Não | |
| Editar  | Não | |
| Excluir | Não | |

**Campos**

| Campo | Obrigatório | Validação |
| - | - | - |
| Cliente  | Sim | |
| Valor    | Calculado pela API no momento da criação do pedido | Totalizador de produtos |
| Produtos | Sim | Vaidar quantidade de produtos disponíveis |

*Obs.:* Cadastro de produtos é um relacionamento n-n com pedido.

## Instalação das dependências

```bash
$ npm install
```

## Executando projeto
O projeto utiliza o banco de dados MySQL. 

Para subir o banco, utilizamos uma imagem Docker.

Executando os comandos abaixo, a imagem do MySQL será criada.

Quando o projeto for executado, todas as tabelas serão criadas.

```bash
# development
$ docker-compose up -d
$ npm run start
```
Assim que o projeto for executado, entrar na seguinte rota:

http://localhost:3000/

## Grupo
**Caio Cesar Alves Borges**

**Kenneth  Azevedo**

**Rafael Ortolani**

**Ryhan Gustavo Brunello**


## License

  Nest is [MIT licensed](LICENSE).
