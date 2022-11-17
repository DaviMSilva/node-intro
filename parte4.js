// utilizando middlewares e headers
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const customers = [
  {
    cpf: '12345',
    name: 'Davi Silva',
    value: 0,
    statement: []
  }
];

function verifyIfCpfExists(req, res, next) {
  const { cpf } = req.headers;

  const customer = customers.find(customer => customer.cpf === cpf);

  if (!customer) {
    return res.status(400).json({ error: 'customer not found' });
  }

  req.customer = customer;

  return next();
}

app.get('/accounts', (req, res) => {
  return res.json(customers);
});

app.post('/account', (req, res) => {
  const { cpf, name } = req.body;

  const verifyIfCustomerExists = customers.some(
    customer => customer.cpf === cpf
  );

  if (verifyIfCustomerExists) {
    return res.status(400).json({ error: 'customer already exists' });
  }

  customers.push({
    cpf: cpf,
    name: name,
    value: 0,
    statement: []
  });
  return res.status(201).send();
});

app.post('/deposit', verifyIfCpfExists, (req, res) => {
  const { desc, amount } = req.body;
  const { customer } = req;

  const operation = {
    desc,
    amount,
    created_at: new Date(),
    type: 'Credit'
  };

  customer.value += amount;
  customer.statement.push(operation);
  return res.status(201).send();
});

app.post('/withdraw', verifyIfCpfExists, (req, res) => {
  const { desc, amount } = req.body;
  const { customer } = req;

  if (customer.value < amount) {
    return res.status(400).json({ error: 'insusficient funds' });
  }

  const operation = {
    desc,
    amount,
    created_at: new Date(),
    type: 'Debit'
  };

  customer.value -= amount;
  customer.statement.push(operation);

  return res.status(201).send();
});

app.listen(3333);
