const express = require('express');
const db = require('./db'); // Importa o banco de dados
const path = require("path");
const app = express();
const port = 3000;

// Para processar dados JSON no corpo das requisições
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{ 
res.sendFile(__dirname+"index.html")

 })

// Endpoint para adicionar um item no banco de dados
app.post('/add-item', (req, res) => {
  const { desc, amount, type } = req.body;

  // Verifica se todos os campos foram preenchidos
  if (!desc || !amount || !type) {
    return res.status(400).send('Preencha todos os campos');
  }

  const query = 'INSERT INTO items (desc, amount, type) VALUES (?, ?, ?)';
  db.run(query, [desc, amount, type], function (err) {
    if (err) {
      return res.status(500).send('Erro ao inserir item');
    }
    res.status(201).send({ id: this.lastID, desc, amount, type });
  });
});

// Endpoint para listar todos os itens do banco de dados
app.get('/items', (req, res) => {
  const query = 'SELECT * FROM items';

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).send('Erro ao buscar itens');
    }
    res.status(200).json(rows);
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
