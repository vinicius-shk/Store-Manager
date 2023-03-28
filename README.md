# Store-Manager

Projeto Store-Manager é uma REST API desenvolvida para gerenciar um sistema de compras e vendas de produtos. O sistema conta com CRUD, armazenado os dados de produtos e vendas, possibilitando consultas e registros de novas vendas, assim como o update das vendas existentes e exclusão de produtos listados.

### Tecnologias utilizadas

- **Javascript**
- **Node.js**
- **MySQL**
- **Express.js**
- **Chai**

### Para rodar localmente

Clone o projeto para o seu repositório local.

```
git clone git@github.com:vinicius-shk/Store-Manager.git

```

Acesse a raiz do projeto e rode os comandos para instalar as dependências e subir o docker

```
cd Store-Manager && npm i && docker-compose up -d

```

Popule o banco de dados e inicie o servidor back-end

```
docker exec store_manager -it && npm run migration && npm run seed && npm run debug

```

Realize as requisições na porta **3000**
