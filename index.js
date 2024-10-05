import Express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { marked } from "marked"; // Converter Markdown para HTML
import { createItem, deleteItem, readItem, readItemById, updateItem } from "./business_crud.js";

const server = Express();
server.use(Express.json());

// Função para ler o README.md
server.get("/", (req, res) => {
    try {
      const readmePath = path.resolve(process.cwd(), "README.md"); // Usar caminho absoluto
  
      // Leitura assíncrona do arquivo
      fs.readFile(readmePath, "utf-8", (err, data) => {
        if (err) {
          // Tratamento de erro ao ler o arquivo
          return res.status(500).json({
            message: "Erro ao carregar a documentação",
            error: err.message,
          });
        }
  
        // Dividindo o conteúdo do README em linhas
        const readmeLines = data.split("\n");
  
        // Procurando a seção "## Índice" (ou outra palavra chave)
        const indexStart = readmeLines.findIndex(line =>
          line.includes("## Índice")
        );
  
        if (indexStart === -1) {
          return res.status(404).json({
            message: "Seção de índice não encontrada.",
          });
        }
  
        // Pegando o conteúdo a partir do índice
        const contentFromIndex = readmeLines.slice(indexStart).join("\n");
  
        // Convertendo a parte selecionada de Markdown para HTML
        const htmlContent = marked(contentFromIndex);
  
        // Enviar o conteúdo convertido em HTML
        res.send(htmlContent);
      });
    } catch (error) {
      // Tratamento de erros gerais
      res.status(500).json({
        message: "Erro ao carregar a documentação",
        error: error.message,
      });
    }
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
