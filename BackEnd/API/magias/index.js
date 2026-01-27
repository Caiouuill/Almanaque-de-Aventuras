const { connectDB } = require('../_db');
const magicController = require('../../Controller/magicController');

module.exports = async (req, res) => {
  // CORS básico (se seu front estiver no mesmo domínio, nem precisa, mas ajuda)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    await connectDB();

    // Em serverless, às vezes req.body chega como string:
    if (typeof req.body === 'string' && req.body) {
      req.body = JSON.parse(req.body);
    }

    if (req.method === 'GET') return magicController.getAllSpells(req, res);
    if (req.method === 'POST') return magicController.createSpell(req, res);

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
