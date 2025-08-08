const express = require('express');
const cors = require('cors');
const magicRoutes = require('./Routes/magicRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/magias', magicRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});