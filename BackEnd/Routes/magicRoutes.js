const express = require('express');
const router = express.Router();
const magicController = require('../Controller/magicController');

router.get('/', magicController.getAllSpells);
router.get('/:numero', magicController.getSpellByNumero);
router.post('/', magicController.createSpell);
router.put('/:numero', magicController.updateSpell);
router.delete('/:numero', magicController.deleteSpell);

module.exports = router;
