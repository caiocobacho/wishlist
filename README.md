# Wishlist

### Tecnologias utilizadas

- NodeJS
- Express
- Mongoose
- Nodemon
- Sucrase
- MongoDB
- Redis
- Jest
- Supertest

## Preparando ambiente

Execute os comandos abaixo para criar um container contendo o MongoDB e o outro contendo o Redis.

- MongoDB:

        docker run --name *** -p 27017:27017 -d -t mongo

- Redis:

        docker run --name *** -p 6379:6379 -d -t redis:alpine

### Variáveis de ambiente
Copie ou renomeie o arquivo `.env.example` para `.env`,adicione as informações, como demonstrado no exemplo.

## Instalação de dependências

Executar o comando yarn ou npm install.

## Iniciar o Servidor de desenvolvimento

Execute o seguinte comando: yarn start

## Testes integrados

Para executar os testes integrados, execute o comando: yarn test

### Reports

Para verificar os reports dos testes, checar o arquivo index.html da pasta coverage, como mostra abaixo:

![image](https://user-images.githubusercontent.com/53964900/76293113-3b1fb300-628f-11ea-85ab-08ceeba70e66.png)


## Rotas

Para testar as apis, utilize postman ou insomnia.

Exemplo de como devem ser os corpos das requisições:


    ```JSON
	{
		name: "Caio Cobacho",
		email: "caiocobacho@dev.com"
	}
    ```

#### Rotas autenticadas

Faça o login na rota /login e copie o token gerado, adicione o token no Header da requisição.

![image](https://user-images.githubusercontent.com/53964900/76291940-eb3fec80-628c-11ea-9ea3-e589ad808ff0.png)




### Cliente

- Visualização: `GET /customer`
	- Retorna os dados do cliente.
	- Esta rota utiliza token.

- Cadastro:  `POST /customer`
	- Cria um usuário.


  Exemplo:
    ```JSON
	{
		name: "Caio Cobacho",
		email: "caiocobacho@dev.com"
	}
    ```
- Login: `POST /login`
	- Autentica o cliente na aplicação.
  - Utiliza apenas o email no corpo da request.



  Exemplo:
    ```JSON
	{
		email: "caiocobacho@dev.com"
	}
    ```

- Atualização: `PUT /customer`
	- Atualiza os dados do usuário no sistema.
  - Esta rota utiliza token.


  Exemplo:
    ```JSON
	{
		name: "Caio Cobacho",
		email: "caiocobacho@newmail.com"
	}
    ```
- Deletar: `DELETE /customer`
	- Deleta o usuário do sistema.
	- Esta rota utiliza token.


### Wishlist

- Listar: `GET /wishlist?page=1`
    - Mostra os produtos salvos na Wishlist por paginação.
    - Esta rota utiliza token.

- Adicionar produto: `PUT /wishlist/:product_id?option=add`
    - Adiciona o produto de acordo com o id apresentado no parâmetro da url.
    - Esta rota utiliza token.

- Remover produto: `PUT /wishlist/:product_id?option=remove`
    - Remove o produto de acordo com o id apresentado no parâmetro da url.
    - Esta rota utiliza token.

- Deletar tudo: `DELETE /wishlist`
    - Deleta todos os produtos da Wishlist.
    - Esta rota utiliza token.

    ## Licença


    Esse projeto está licenciado sob os termos de Licença do MIT. Veja o arquivo [LICENSE](https://github.com/caiocobacho/wishlist/blob/master/LICENSE "Arquivo LICENSE").


