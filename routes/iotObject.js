
const { Router } = require('express');
const { getAll, post } = require('../controllers/iotObject')
const { validateHandler } = require('../middlewares/validations');

const router = Router();

router.get('/', getAll);

router.post('/', [
    validateHandler
], post);

module.exports = router;