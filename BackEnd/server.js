const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const magicRoutes = require('./Routes/magicRoutes');
const itemRoutes = require('./Routes/itemRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

// Conexão com MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Conectado ao MongoDB Atlas'))
  .catch(err => console.error('❌ Erro ao conectar:', err));

app.use('/api/magias', magicRoutes);
app.use('/api/items', itemRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
