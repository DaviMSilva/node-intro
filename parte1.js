// instalar os pacotes necessarios para a oficina: express nodemon
// funcionamento do get e do express
const express = require('express');
const app = express();
const PORT = 3333;

app.get('/', (req, res) => {
  res.send('<h1>introducao ao node</h1>');
});

app.get('/rota', (req, res) => {
  res.json({ message: 'ola mundo' });
});

app.get('/res', (req, res) => {
  res.status(401).json({ error: 'not found' });
});

app.listen(PORT);
