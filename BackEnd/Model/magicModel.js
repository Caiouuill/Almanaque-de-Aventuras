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


// File: BackEnd/Model/magicModel.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../data/spells.json');

function readData() {
  const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : '[]';
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
  getAll: () => readData(),

  getById: (id) => {
    const spells = readData();
    return spells.find(spell => spell.id === id);
  },

  create: (spell) => {
    const spells = readData();
    spell.id = Date.now().toString();
    spells.push(spell);
    writeData(spells);
    return spell;
  },

  update: (id, updatedData) => {
    const spells = readData();
    const index = spells.findIndex(spell => spell.id === id);
    if (index === -1) return null;
    spells[index] = { ...spells[index], ...updatedData };
    writeData(spells);
    return spells[index];
  },

  remove: (id) => {
    let spells = readData();
    const initialLength = spells.length;
    spells = spells.filter(spell => spell.id !== id);
    if (spells.length === initialLength) return false;
    writeData(spells);
    return true;
  }
};