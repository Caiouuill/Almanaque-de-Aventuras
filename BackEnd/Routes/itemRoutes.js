const express = require('express');
const router = express.Router();
const itemController = require('../Controller/itemController');

router.get('/', itemController.getAllItems);
router.get('/:id', itemController.getItemById);
router.post('/', itemController.createItem);
router.delete('/:id', itemController.deleteItem);
router.delete('/', itemController.deleteAllItem);

module.exports = router;
