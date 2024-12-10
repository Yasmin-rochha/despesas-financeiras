const sqlite3 = require('sqlite3').verbose();

// Cria ou abre um banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error("Erro ao abrir banco de dados:", err.message);
  } else {
    console.log("Banco de dados SQLite conectado com sucesso!");
  }
});

// Função para criar a tabela de itens (caso não exista)
const createTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      desc TEXT,
      amount REAL,
      type TEXT
    );
  `;
  db.run(query, (err) => {
    if (err) {
      console.error("Erro ao criar tabela:", err.message);
    } else {
      console.log("Tabela criada ou já existe!");
    }
  });
};

// Chama a função para criar a tabela quando iniciar o app
createTable();

module.exports = db;
