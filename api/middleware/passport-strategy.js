const { Strategy, ExtractJwt } = require('passport-jwt')
// const { model } = require('mongoose')
const keys = require('./../config/keys')
// Get 'users' collection
// const User = model('users')
const User = require('./../models/user')

const options = {
  // Send JWT from FrountEnd in the Headers
  // fromAuthHeaderAsBearerToken() make a Header like:
  // Authorization: Bearer ret34jkjjkjklj
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT
}

// Strategy decreption
module.exports = new Strategy(options, async (payload, done) => {
  try {
    const applicant = await User().findbyId(payload.userId).select('id')
    if (applicant) {
      done(null, applicant)
    } else {
      // Authorization for spacific Route is restricted
      done(null, false)
    }
  } catch (e) {
    console.error(e)
  }
})
