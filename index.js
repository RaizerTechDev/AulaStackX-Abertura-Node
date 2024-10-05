import Express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { marked } from "marked"; // Converter Markdown para HTML
import { createItem, deleteItem, readItem, readItemById, updateItem } from "./business_crud.js";

const server = Express();
server.use(Express.json());

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

// Rota para a documentação em JSON
server.get("/documentation", (req, res) => {
  const documentationPath = path.resolve(process.cwd(), "documentation.json");
  fs.readFile(documentationPath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Erro ao carregar a documentação",
        error: err.message,
      });
    }
    res.json(JSON.parse(data));
  });
});

// Outros endpoints da API
server.get("/itens", (req, res) => {
  const item = readItem();
  res.status(200).json(item);
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
