import Express from "express";
import {
  createItem,
  deleteItem,
  readItem,
  readItemById,
  updateItem,
} from "./business_crud.js";

const server = Express();

server.use(Express.json());

server.get("/", (req, res) => {
  res.status(200).json({
    message: "🌟 Bem-vindo à API de Itens!",
    instructions:
      "Para acessar os itens, adicione '/itens' ao final da URL(https://aula-stack-x-abertura-node.vercel.app/) e atualize a página.",
    postman_link:
      "👉 Para começar a usar a API, acesse o link do Postman: (https://www.postman.com/)",
    additional_message:
      "✨ Esta API permite realizar operações de CRUD com itens! Experimente as seguintes ações:",
    actions: {
      post: "➕ Use POST em (json) para adicionar novos itens incríveis! Exemplo de itens (https://github.com/RafaRz76Dev/AulaStackX-Abertura-Node/blob/master/create_post.json)",
      get: "🔍 Faça uma requisição GET para visualizar todos os itens ou por (/ID) selecionando o item .",
      put: "✏️ Atualize os itens existentes da lista (GET) com uma requisição PUT.",
      delete:
        "🗑️ E não esqueça, você pode remover itens com DELETE por (/ID) da lista (GET)!",
    },
  });
});

// Endpoint GET
server.get("/itens", (req, res) => {
  const item = readItem();
  res.status(200).json(item);
});

// Endpoint GET/ID
server.get("/itens/:id", (req, res) => {
  const id = req.params.id;
  const item = readItemById(id);
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: "Item não encontrado." });
  }
});

// Endpoint POST
server.post("/itens", (req, res) => {
  const item = req.body;
  const newItem = createItem(item);
  res.status(201).json(newItem);
});

// Endpoint PUT
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

// Endpoint DELETE
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
