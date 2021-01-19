const { Router } = require('express')
const router = Router()
const validationRegistration = require('./../middleware/regisration-user');
const { register } = require('./../controllers/register');
const { emailVerification } = require('./../controllers/email-verification');

// first time registration '/api/user/registration'
router.post('/registration', validationRegistration(), register);
// Emeil verification
//'/api/user/verification'
router.post('/verification', (req,res,next)=>next(), emailVerification);

module.exports = router
