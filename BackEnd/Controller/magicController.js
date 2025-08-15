const Magic = require('../Model/magicModel');

exports.getAllSpells = async (req, res) => {
  try {
    const spells = await Magic.find();
    const ordered = spells.map(spell => ({
      _id: spell._id,
      numero: spell.numero,
      nome: spell.nome,
      nomeIngles: spell.nomeIngles || '',
      nivel: spell.nivel,
      escola: spell.escola,
      tempoConjuracao: spell.tempoConjuracao,
      alcance: spell.alcance,
      ritual: spell.ritual,
      tipoMagia: spell.tipoMagia,
      duracao: spell.duracao,
      componentes: spell.componentes,
      descricao: spell.descricao,
      niveisAltos: spell.niveisAltos || '',
      livro: spell.livro,
      pagina: spell.pagina,
      classes: spell.classes || [],
      createdAt: spell.createdAt,
      updatedAt: spell.updatedAt,
      __v: spell.__v
    }));
    res.json(ordered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getSpellByNumero = async (req, res) => {
  try {
    const numero = Number(req.params.numero);
    const spell = await Magic.findOne({ numero });
    if (!spell) return res.status(404).json({ error: 'Magia não encontrada' });
    res.json(spell);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSpell = async (req, res) => {
  try {
    const newSpell = new Magic(req.body);
    await newSpell.save();
    res.status(201).json(newSpell);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateSpell = async (req, res) => {
  try {
    const numero = Number(req.params.numero);
    const updated = await Magic.findOneAndUpdate({ numero }, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Magia não encontrada' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSpell = async (req, res) => {
  try {
    const numero = Number(req.params.numero);
    const deleted = await Magic.findOneAndDelete({ numero });
    if (!deleted) return res.status(404).json({ error: 'Magia não encontrada' });
    res.json({ message: 'Magia deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
