
# Desafio Técnico 2

Desenvolver uma API RESTful para autenticação de usuários, que permita operações de cadastro (sign up), autenticação (sign in) e recuperação de informações do usuário.






## Tecnologias
**Git & GitHub** 

**Node**

**JavaScript**

**Express**

**Render**

**PostgreSQL**

**npm**

**ESLint**

**JWT**

**bcrypt**

**Jest**


## Uso com GitHub (Ubuntu/Debian)
1) Instalação do git:
```bash
sudo apt update

sudo apt upgrade

sudo apt install git
```
2) Instalação do node:
```bash
sudo apt-get update

sudo apt-get install -y ca-certificates curl gnupg

sudo mkdir -p /etc/apt/keyrings

curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

NODE_MAJOR=20

echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

sudo apt-get update

sudo apt-get install nodejs -y
```
3) Baixar o repositório do git em sua máquina:

```bash
https://github.com/mateuspit/tecnicalChallangeAPIJS
```

4) Instalar os pacotes com npm: 
```bash
npm install
```

5) Criar banco de dados PostgreSQL;

6) Configurar seu arquivo .env de acordo com .env.example e as configurações do seu banco PostgreSQL;

7) Buildar o projeto:

```bash
npm run build
```

8) Iniciar o servidor do projeto:

```bash
npm start
```

#### Screenshots

![Inicio](https://i.imgur.com/k4x4klh.png)


## Testes automatizados

Foram criados testes unitários como solicitado utilizando a biblioteca Jest, para as rotas de usuário e de autenticação

Eles podem ser realizados da seguinte maneira, na pasta raiz do projeto:

```bash
npm test
```

#### Screenshots

![App Screenshot](https://i.imgur.com/cLvUTqc.png)## Repositórios

- [GitHub](https://github.com/mateuspit/tecnicalChallangeAPIJS)
## Autor

- [@Mateus Barcelos](https://www.github.com/mateuspit)

Qualquer dúvidas: mateuspit@gmail.com ou pelo whastapp: [+55 61 98144 1074](https://api.whatsapp.com/send?phone=5561981441074&text=Oi%20Vi%20seu%20codigo%20no%20GitHub%20e...).
