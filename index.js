// index.js (ou index.cjs se você estiver usando CommonJS)
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { readFile } from 'fs/promises';

const app = express();

// Função para carregar a documentação do Swagger
const loadSwaggerDocument = async () => {
  const data = await readFile(new URL('./public/documentation.swagger.json', import.meta.url));
  return JSON.parse(data);
};

// Rota para documentação do Swagger
loadSwaggerDocument()
  .then(swaggerDocument => {
    // Configure a rota para a documentação do Swagger
    app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  })
  .catch(err => {
    console.error("Erro ao carregar o Swagger Document:", err);
  });

// Exemplo de rota
app.get('/itens', (req, res) => {
  res.json([{ id: 1, nome: 'Item 1' }, { id: 2, nome: 'Item 2' }]);
});

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});
