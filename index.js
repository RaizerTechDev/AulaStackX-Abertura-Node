import Express from "express";
import { createItem, readItemById, readItem, updateItem, deleteItem } from "./business_crud.js";

const server = Express();

server.use(Express.json());

server.get('/', (req, res) => {
    res.status(200).json({
        message: "Bem-vindo à API de Itens!",
        instructions: "Para acessar os itens, adicione '/itens' ao final da URL e atualize a página."
    });
});

// Endpoint GET
server.get('/items', (req, res) => { 
    const item = readItem();
    res.status(200).json(item);
});

// Endpoint GET/ID
server.get('/items/:id', (req, res) => {
    const id = req.params.id;
    const item = readItemById(id);
    if (item) {
        res.status(200).json(item);
    } else {
        res.status(404).json({ message: "Item não encontrado." });
    }
});

// Endpoint POST
server.post('/items', (req, res) => {
    const item = req.body; 
    const newItem = createItem(item);
    res.status(201).json(newItem);
});

// Endpoint PUT
server.put('/items/:id', (req, res) => {
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
server.delete('/items/:id', (req, res) => {
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
