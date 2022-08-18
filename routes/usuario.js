
const { Router } = require('express');
const { check } = require('express-validator');
const { validateHandler } = require('../middlewares/validations');
const { rolEsValido, usuarioEmailExiste, usuarioIdExiste } = require('../helpers/db-validators');

const { usuarioGet, 
        usuarioPost, 
        usuarioPut, 
        usuarioDelete,
        getAll } = require('../controllers/usuario')

const router = Router();

router.get('/', usuarioGet);
router.get('/all', getAll);

router.post('/', [
        check('nombre', 'El nombre es oblidatorio').not().isEmpty(),
        check('password', 'La contraseña debe de tener al menos 6 caracteres').isLength({ min: 6}),
        check('email', 'El formato del email no es válido').isEmail(),
        check('email').custom(usuarioEmailExiste),
        check('rol').custom(rolEsValido),
        validateHandler
    ], usuarioPost);

router.put('/:id', [
        check('id', 'El id proporcionado no es válido').isMongoId(),
        check('id').custom(usuarioIdExiste),
        check('rol').custom(rolEsValido),
        validateHandler
    ], usuarioPut);

router.delete('/:id', [
        check('id', 'El id proporcionado no es válido').isMongoId(),
        check('id').custom(usuarioIdExiste),
        validateHandler
    ], usuarioDelete);

module.exports = router;