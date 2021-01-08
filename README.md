# test-chat2desk
Desenvolver um sistema de cadastros de usuários e login. 
O sistema deve ser desenvolvido em Node.js e a interface não será avaliada, não se preocupe com ela. 
É recomendado o uso de uma estrutura MVC. 
Não é necessário configurar um banco de dados para realizar os testes, apenas um arquivo, como por exemplo, um JSON contendo os dados é suficiente para simular o banco. 
Para nos enviar, crie um repositório no GitHub ou no BitBucket e compartilhe o link conosco!  
Serão avaliados: 
- A estrutura e organização do código 
- As estratégias utilizadas 
- O domínio do JavaScript 
- Validação dos campos 
- Tratamento de erros (que podem ser simulados para efeito de teste)


- Para rodar o projeto 

```
git clone  https://github.com/gabizinha12/test-chat2desk.git
```
```
npm install
```
```
nodemon server.js
```
- Criar conexão chamada "chat2desk" com user root
- A senha está no .env, só clonar e abrir no VSCode

- Para ver o projeto no seu navegador, abra em localhost:3000

- Rotas
```
/  => Lista os usuários
/user/create => registra os usuários(essa rota possui somente a lógica do cadastro)
/user/login => logar como usuário(essa rota possui somente a lógica do login)
/user/register => renderiza o form de cadastro
/login => renderiza a página de login
/logout => logout de usuário
```

- Tecnologias usadas:
- MySQL
- Sequelize
- Nodemon
- Passport para autenticação
- Bcrypt para hash de senha
- Connect-flash para erros
- Express
- Express Router
- Express sessions para salvar as sessões
- Body parser para recebimento de dados no back-end
- EJS para view engine
