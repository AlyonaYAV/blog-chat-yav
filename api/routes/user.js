const { Router } = require('express')
const router = Router()
const validationRegistration = require('./../middleware/regisration-user');
const { register } = require('./../controllers/register');

// first time registration
router.post('/registration', validationRegistration(), register);

module.exports = router
