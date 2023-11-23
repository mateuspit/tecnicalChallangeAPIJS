// swaggerOptions.js

export default {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API RESTful para autenticação de usuários",
            version: "1.0.0",
            description: "API RESTful para autenticação de usuários, que permita operações de cadastro (sign up), autenticação (sign in) e recuperação de informações do usuário.",
        },
        servers: [
            {
                url: "http://localhost:5000", // ajuste conforme necessário
            },
        ],
    },
    apis: ["./src/routes/*.js"], // ajuste conforme a estrutura do seu projeto
};
