import Express from "express";
import swaggerUi from "swagger-ui-express";

const server = Express();
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API de Itens",
    version: "1.0.0",
    description: "Documentação da API de Itens"
  },
  paths: {
    "/itens": {
      get: {
        summary: "Obter todos os itens",
        responses: {
          "200": {
            description: "Lista de todos os itens",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer"
                      },
                      nome: {
                        type: "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

server.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
