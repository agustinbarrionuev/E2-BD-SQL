const express = require('express');
const app = express();
const expensesRouter = require('./routes/expenses');

app.use('/expenses', expensesRouter);


app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de gastos!');
});

// Agrega aquí tus rutas y lógica adicional

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`La API está funcionando en el puerto ${PORT}`);
});
