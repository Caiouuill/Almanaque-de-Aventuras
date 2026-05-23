const { connectDB } = require('../_db');
const magicController = require('../../Controller/magicController');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    await connectDB();

    if (typeof req.body === 'string' && req.body) {
      req.body = JSON.parse(req.body);
    }

    if (req.method === 'GET') return magicController.getSpellByNumero(req, res);
    if (req.method === 'PUT') return magicController.updateSpell(req, res);
    if (req.method === 'DELETE') return magicController.deleteSpell(req, res);

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
