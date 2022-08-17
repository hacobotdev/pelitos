
const { Router } = require('express');
const { check } = require('express-validator');
const { validateHandler } = require('../middlewares/validations');
const { roleIsValid, userLoginExists, userIdExist } = require('../helpers/db-validators');

const { userGet, 
        userPost, 
        userPut, 
        userDelete,
        getAll } = require('../controllers/user')

const router = Router();

router.get('/', userGet);
router.get('/all', getAll);

router.post('/', [
        check('name', 'The name is required').not().isEmpty(),
        check('password', 'The pasword must be at least 6 characters').isLength({ min: 6}),
        check('login', 'The login is not a valid email').isEmail(),
        check('login').custom(userLoginExists),
        check('role').custom(roleIsValid),
        validateHandler
    ], userPost);

router.put('/:id', [
        check('id', `The provided value is not a valid id`).isMongoId(),
        check('id').custom(userIdExist),
        check('role').custom(roleIsValid),
        validateHandler
    ], userPut);

router.delete('/:id', [
        check('id', `The provided value is not a valid id`).isMongoId(),
        check('id').custom(userIdExist),
        validateHandler
    ], userDelete);

module.exports = router;