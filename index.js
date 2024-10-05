import Express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { createItem, deleteItem, readItem, readItemById, updateItem } from "./business_crud.js";

const server = Express();
server.use(Express.json());
// Carregar o arquivo Swagger do diretório public
let swaggerFile;

try {
  swaggerFile = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "public", "documentation.swagger.json"), 'utf-8'));
} catch (error) {
  console.error("Erro ao ler o arquivo Swagger:", error);
  process.exit(1); // Encerra o processo com erro
}

// Usar Swagger UI para servir a documentação
server.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Rota principal
server.get("/", (req, res) => {
  res.status(200).send(`
    <html>
      <head>
        <title>Bem-vindo à API de Itens!</title>
      </head>
      <body>
        <h1>🌟 Bem-vindo à API de Itens!</h1>
        <p>Acesse <a href="/documentation">/documentation</a> para ver a documentação da API.</p>
        <p>👉 Para começar a usar a API, acesse o link do Postman: <a href="https://www.postman.com/">Postman</a></p>
      </body>
    </html>
  `);
});
// Outros endpoints da API
server.get("/itens", (req, res) => {
  const items = readItem();
  res.status(200).json(items);
});

server.get("/itens/:id", (req, res) => {
  const id = req.params.id;
  const item = readItemById(id);
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: "Item não encontrado." });
  }
});

server.post("/itens", (req, res) => {
  const item = req.body;
  const newItem = createItem(item);
  res.status(201).json(newItem);
});

server.put("/itens/:id", (req, res) => {
  const id = req.params.id;
  const nameUpdate = req.body;
  const item = updateItem(id, nameUpdate);
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: "Item não encontrado." });
  }
});

server.delete("/itens/:id", (req, res) => {
  const id = req.params.id;
  const item = deleteItem(id);
  if (item) {
    res.status(200).json({ message: "Item deletado com sucesso!" });
  } else {
    res.status(404).json({ message: "Item não encontrado." });
  }
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
