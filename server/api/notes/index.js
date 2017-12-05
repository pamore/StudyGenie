'use strict';

var express = require('express');
var controller = require('./notes.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:n_id', controller.show);
router.get('/author/:author_id', controller.showByAuthorID);
router.post('/', controller.create);
router.put('/:n_id', controller.upsert);
router.patch('/:n_id', controller.patch);
router.delete('/:n_id', controller.destroy);

module.exports = router;
