const magicModel = require('../Model/magicModel');

exports.getAllSpells = (req, res) => {
  res.json(magicModel.getAll());
};

exports.getSpellById = (req, res) => {
  const spell = magicModel.getById(req.params.id);
  if (spell) res.json(spell);
  else res.status(404).json({ error: 'Magia não encontrada' });
};

exports.createSpell = (req, res) => {
  const newSpell = magicModel.create(req.body);
  res.status(201).json(newSpell);
};

exports.updateSpell = (req, res) => {
  const updated = magicModel.update(req.params.id, req.body);
  if (updated) res.json(updated);
  else res.status(404).json({ error: 'Magia não encontrada' });
};

exports.deleteSpell = (req, res) => {
  const deleted = magicModel.remove(req.params.id);
  if (deleted) res.status(204).send();
  else res.status(404).json({ error: 'Magia não encontrada' });
};