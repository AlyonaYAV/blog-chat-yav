const { body } = require('express-validator');

module.exports = ()=>{
  //Expected parameters: working password, confirmed password
  return [
    // Working password must be from 5 to 12 chars log
    body('workPass').custom( (value, { req })=>{
      if(value.length < 5 || req.body.workPass.length > 12){
        throw new Error('Password characters format is incorrect');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    }),
    // password must be  at least 5 chars long
    body('pass').isLenth({ min: 5, max: 12 }).withMessage('Characters from 5 to 12'),
    // password confirmation
    body('confirmedPass').custom( (value, { req })=>{
      if(value !== req.body.pass){
        throw new Error('Password confirmation does not match password');
      }
      // Indicates the success of this synchronus custom validator
      return true;
    } )
  ]
}