const express = require('express');
const app = express();
const correlationRoutes = require('./routes/correlationRoutes');
const probabilityRoutes = require('./routes/probabilityRoutes');

app.use(express.json());
app.use(express.static('public')); // servir arquivos estáticos (html, js)

app.use('/api/correlation', correlationRoutes);
app.use('/api/probability', probabilityRoutes)

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
console.log(`Servidor rodando na porta ${PORT}`)
