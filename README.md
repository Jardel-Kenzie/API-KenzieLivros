# Documentação

## Base url da API: https://api-kenzie-livros.herokuapp.com/

# Requisição Publica

## livros - GET
Requisição publica, não precisa de autenticação, apenas retorna um array de objetos com os dados do banco


* Entrada da API
```JavaScript
url: "https://api-kenzie-livros.herokuapp.com/livros"

{
    method: "GET",
    headers: {"Content-Type": "application/json"}
} 
```

### Retorno dos dados

```Json
status: 200
[
	{
		"id": 1,
		"titulo": "Harry Potter e a Pedra Filosofal",
		"autor": "J.K Rowling",
		"categoria": "Fantasia",
		"descricao": "Um menino com a testa rachada que taca magia e dorme em baixo da escada",
		"imagem": "https://f.i.uol.com.br/fotografia/2021/09/22/1632323361614b47217d1f2_1632323361_3x2_md.jpg",
		"createdAt": "2022-05-11T03:17:17.331Z",
		"updatedAt": "2022-05-11T03:17:17.331Z"
	},
	{
		"id": 2,
		"titulo": "Senhor dos aneis",
		"autor": "J. R. R. Tolkien",
		"categoria": "Fantasia",
		"descricao": "Tem um Anel do mal, que pega na mente ein, MY PRECIOUSSS",
		"imagem": null,
		"createdAt": "2022-05-11T03:18:21.578Z",
		"updatedAt": "2022-05-11T03:18:21.578Z"
	},
	{
		"id": 3,
		"titulo": "Star Wars",
		"autor": "George Lucas",
		"categoria": "Ficção Cientifica",
		"descricao": "Tem um pequenos senhor verde que fala tudo ao contrario, Espada UOWWNN",
		"imagem": null,
		"createdAt": "2022-05-11T03:20:43.258Z",
		"updatedAt": "2022-05-11T03:20:43.258Z"
	}
]
```

# Requisições de autorizações

## auth/register - POST

requisição para a criação de um novo user

```JavaScript
url: "https://api-kenzie-livros.herokuapp.com/auth/register"

{
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: {
        "name": "Jardel", // usernmae da conta
        "email": "jardel@gmail.com", //Email valido
        "password": "1111" // Password
    }
} 
```

Só é possível criar uma conta por email

### Retorno dos dados

```Json
status: 201
{
	"id": 2,
	"name": "Jardel",
	"email": "jardel@gmail.com",
	"password": "$2a$08$StnDO59.5c4iIZXF3jvc7u25Q2Jd4CMkICPw1fK9Bmirj5sxEmADO",
	"updatedAt": "2022-05-11T03:21:00.262Z",
	"createdAt": "2022-05-11T03:21:00.262Z"
}
```
---

## auth/login - POST

requisição para a validação do user, retornando token

```JavaScript
url: "https://api-kenzie-livros.herokuapp.com/auth/login"

{
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: {
        "email": "jardel@gmail.com", //Email valido
        "password": "1111" // Password
    }
} 
```
### Retorno dos dados

Retornando uma string representando o token de acesso

```Json
status: 200
"uyaeyauduwyuyyeyeeeee5e5Ea5d5e41555.eWeesdsde5sd1a5d5E4d2a2d15dwd15.We2228314sdsdhhsdkasdihashdtgadjuUUYstgajHg"
```

# Requisições Privadas

Requisições privadas, precisa do token de acesso para conseguir navegar

## my/livros - POST


```JavaScript
url: "https://api-kenzie-livros.herokuapp.com/my/livros"

{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer {TokenDoUser}"
    },
    body: {
        "titulo": "Star Wars",
	    "categoria": "Ficção Cientifica",
	    "descricao": "Tem um pequenos senhor verde que fala tudo ao contrario, Espada UOWWNN",
	    "autor": "George Lucas"
        "imagem": "https://f.i.uol.com.br/fotografia/2021/09/22/1632323361614b47217d1f2_1632323361_3x2_md.jpg" 
    }
} 
```

imagem é a unica chave citada acima na qual não é obrigatoria. 


### Retorno dos dados

```Json
status: 201
{
	"id": 4,
	"titulo": "Star Wars",
	"autor": "George Lucas",
	"categoria": "Ficção Cientifica",
	"imagem": "https://f.i.uol.com.br/fotografia/2021/09/22/1632323361614b47217d1f2_1632323361_3x2_md.jp",
	"descricao": "Tem um pequenos senhor verde que fala tudo ao contrario, Espada UOWWNN",
	"updatedAt": "2022-05-11T03:22:42.160Z",
	"createdAt": "2022-05-11T03:22:42.160Z"
}
```

---

## my/livros - GET


```JavaScript
url: "https://api-kenzie-livros.herokuapp.com/my/livros"

{
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer {TokenDoUser}"
    }
} 
```

### Retorno dos dados

```Json
status: 200
[
    {
		"id": 1,
		"titulo": "Harry Potter e a Pedra Filosofal",
		"autor": "J.K Rowling",
		"categoria": "Fantasia",
		"descricao": "Um menino com a testa rachada que taca magia e dorme em baixo da escada",
		"imagem": "https://f.i.uol.com.br/fotografia/2021/09/22/1632323361614b47217d1f2_1632323361_3x2_md.jpg",
		"createdAt": "2022-05-11T03:17:17.331Z",
		"updatedAt": "2022-05-11T03:37:34.880Z"
	}
]
```
---

## my/livros/{id} - PATCH

Recebe um ID pela requisição url representando o ID do livro na qual quer alterar

```JavaScript
url: "https://api-kenzie-livros.herokuapp.com/my/livros/1"
{
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer {TokenDoUser}"
    },
    body: {
        "titulo": "Star Wars" 
    }
} 
```

Deve passar ao menos um (ou mais) desses dados pelo body: 

* titulo - STRING
* categoria - STRING
* descricao - STRING
* autor - STRING
* imagem - STRING - URL


### Retorno dos dados

```Json
status: 202
"Livro Atualizado"
```

## my/livros/{id} - DELETE

Recebe um ID pela requisição url representando o ID do livro na qual quer deletar

```JavaScript
url: "https://api-kenzie-livros.herokuapp.com/my/livros/1"
{
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer {TokenDoUser}"
    }
} 
```

### Retorno dos dados

```Json
status: 204
```
