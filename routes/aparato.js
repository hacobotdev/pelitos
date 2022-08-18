
const { Router } = require('express');
const { getAll, post, put, put_switch } = require('../controllers/aparato')
const { validateHandler } = require('../middlewares/validations');

const router = Router();

router.get('/', getAll);

router.post('/', [
    validateHandler
], post);

router.put('/', [
    validateHandler
], put);

router.put('/:nombre', [
    validateHandler
], put_switch);

module.exports = router;