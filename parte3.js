// utilizando put e delete
const express = require('express');
const app = express();

app.use(express.json());

const customers = [
  {
    name: 'davi',
    cpf: '1234',
    value: 0
  },
  {
    name: 'joao',
    cpf: '12345',
    value: 0
  }
];

app.get('/accounts', (req, res) => {
  return res.json(customers);
});

app.put('/account/edit', (req, res) => {
  const { cpf, name } = req.body;

  customers.forEach(customer => {
    if (customer.cpf === cpf) {
      customer.name = name;
      customer.value = 100;
      return res.status(200).json({ message: 'Alterado com sucesso' });
    }
  });
  res.status(404).send();
});

app.delete('/account/delete/:cpf', (req, res) => {
  const { cpf } = req.params;
  
  const customer = customers.find(customer => customer.cpf ===cpf)
  if(!customer){
    res.status(404).send()
  }
  else{

    customers.splice(customer, 1);
    return res.status(200).json({message: 'deleted'})
  }
});

app.listen(3333);
