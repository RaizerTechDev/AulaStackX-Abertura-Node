import Express from "express";
import { createItem, deleteItem, readItem, readItemById, updateItem } from "./business_crud.js";
import dotenv from "dotenv"; // Importando dotenv
dotenv.config(); // Carregando as variáveis de ambiente

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
        <p>👉 Para acessar a documentação no Postman, clique aqui: <a href="${process.env.POSTMAN_DOC_LINK}" target="_blank">Documentação da API</a></p>       
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
