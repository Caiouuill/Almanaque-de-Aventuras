const express = require('express');
const router = express.Router();
const magicController = require('../Controller/magicController');

router.get('/', magicController.getAllSpells);
router.get('/:id', magicController.getSpellById);
router.post('/', magicController.createSpell);
router.put('/:id', magicController.updateSpell);
router.delete('/:id', magicController.deleteSpell);

module.exports = router;
