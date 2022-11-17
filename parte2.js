// utilizando o post para enviar dados
// utilizar nodemon e uuid
const express = require('express');

const { v4: uuid } = require('uuidv4');

const app = express();
app.use(express.json());

const customers = [];

app.get('/', (req, res) => {
  res.status(200).json(customers);
});

app.post('/account', (req, res) => {
  const { name, cpf } = req.body;
  customers.push({
    cpf: cpf,
    name: name,
    id: uuid(),
    balance: 0,
    transactions: []
  });
  res.status(201).send();
});


app.listen(3030);
