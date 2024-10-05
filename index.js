import Express from "express";
import fs from "fs";
import path from "path";

const server = Express();
server.use(Express.json());

// Rota principal
server.get("/", (req, res) => {
  res.status(200).json({
    message: "🌟 Bem-vindo à API de Itens!",
    instructions: "Acesse '/documentation' para ver a documentação da API.",
    postman_link: "👉 Para começar a usar a API, acesse o link do Postman: (https://www.postman.com/)"
  });
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
  // Lógica para retornar itens
});

server.get("/itens/:id", (req, res) => {
  // Lógica para retornar um item específico
});

server.post("/itens", (req, res) => {
  // Lógica para adicionar um item
});

server.put("/itens/:id", (req, res) => {
  // Lógica para atualizar um item
});

server.delete("/itens/:id", (req, res) => {
  // Lógica para deletar um item
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
