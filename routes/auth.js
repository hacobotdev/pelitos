
const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

router.post('/login', (req, res) => {
    console.log('amonos recio'); 
    res.json( { 
        msg: `Login Created` 
    });
});

module.exports = router;