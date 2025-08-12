const Magic = require('../Model/magicModel');

exports.getAllSpells = async (req, res) => {
  try {
    const spells = await Magic.find();
    res.json(spells);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSpellByNumero = async (req, res) => {
  try {
    const spell = await Magic.findById(req.params.numero);
    if (!spell) return res.status(404).json({ error: 'Magia não encontrada' });
    res.json(spell);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSpell = async (req, res) => {
  try {
    console.log("📥 Recebido no POST:", req.body); // <-- debug
    const newSpell = new Magic(req.body);
    await newSpell.save();
    res.status(201).json(newSpell);
  } catch (err) {
    console.error("❌ Erro ao salvar magia:", err);
    res.status(400).json({ error: err.message });
  }
};


exports.updateSpell = async (req, res) => {
  try {
    const updated = await Magic.findByIdAndUpdate(req.params.numero, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Magia não encontrada' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSpell = async (req, res) => {
  try {
    const deleted = await Magic.findByIdAndDelete(req.params.numero);
    if (!deleted) return res.status(404).json({ error: 'Magia não encontrada' });
    res.json({ message: 'Magia deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
