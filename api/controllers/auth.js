const { validationResult } = require('express-validator');
const { User } = require('./../helpers/db');
const { compare: comparePasswords } = require('./../helpers/salt');
const { generateJwtToken } = require('./../helpers/jwt');
const { generateRefreshToken } = require('./../helpers/jwt-refresh');
const basicDetails = require('./../helpers/basic-details');
const setTokenCookie = require('./../helpers/token-cookie');
const createSalt = require('./../helpers/salt');

async function authenticate(req, res, next){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  const { email, password } = req.body;
  const ipAddress = req.ip;
  try{
      const user = await User.findOne({ email });
      if(!user) throw new Error("Email or password is incorrect");
      comparePasswords(password, user.passwordHash, async function(error, matchResult){
        try{
          if(error) throw new Error("Email or password is incorrect");
          // For all users who are not registreted by the administrator - user.registeredByAdmin is 'false'
          if(!user.registeredByAdmin){
            if (!user || !user.isVerified || !matchResult) {
              throw new Error('Email or password is incorrect');
            }
          }
          // authentication successful so generate jwt
          const jwtToken = generateJwtToken(user);
          // authentication successful so generate refresh token
          const refreshToken = generateRefreshToken(user, ipAddress);

           // save refresh token
          await refreshToken.save();

          // basic details and tokens
          const details = {
              ...basicDetails(user),
              jwtToken,
              refreshToken: refreshToken.token
          };
          setTokenCookie(res, refreshToken.token);
          res.status(200).json({ message: 'You are authenticated', details });
        }catch(e){
          return res.status(401).json({ msg: e.message, details: null });
        }
      });
  }catch(e){
    return res.status(401).json({ msg: e.message, details: null });
  }
}

function createUserByAdmin(req, res){
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  createSalt(req.body.password, async function(hash){
    // Create account object
    const user = new User({
      "login": req.body.login,
      "email": req.body.email,
      "passwordHash": hash,
      "acceptTerms": req.body.acceptTerms,
      "role": req.body.role,
      "registeredByAdmin": req.body.registeredByAdmin,
      "verified": req.body.verified
    });
    // save user account
    try{
      await user.save();
      res.status(201).json({"message": "A new user has been created","userInfo": user});
    }catch(e){
      return res.status(500).json({"message": "Access denied"});
    }
  });
}

async function getAllUsers(req, res){
  const userId = req.user.id || '';
  try{
    const allUsers = await User.find({});
    if(allUsers){
      return res.status(200).json({ "message": "You've got all the users","users": [allUsers, userId] });
    }
    res.status(500).json({ "message":"Access denied"});
  }catch(e){
    return res.status(500).json({ "message":"Access denied"});
  }
}
// The private function for Blog and Chat ban controllers
async function setStatusBan(userId, docObject, res){
  if(!userId){
    return res.status(500).json({ "message": "Unknown user" });
  }
  try{
    const result = await User.findOneAndUpdate({_id: userId},{$set: docObject},{new:true})
    if(result){
      return res.status(200).json({ "message": "Success", result });
    }
  }catch(e){
    return res.status(500).json({ "message": "Access denied" });
  }
}

function setStatusBanBlog(req, res){
  const { blog, userId } = req.body;
  // Call the private function
  return setStatusBan(userId, { blogBan: blog }, res);
}

function setStatusBanChat(req, res){
  const { chat, userId } = req.body;
  // Call the private function
  return setStatusBan(userId, { chatBan: chat }, res);
}

function getRole(req,res){
  // 'admin' || 'moderator'
  const { role } = req.user;
  // The Role is pulled from Passport Middleware
  if(role){
    // Always return status 200, because if exists Bad status it is returned in Middleware before
    return res.status(200).json({ role, message: "Welcome to admin panel" });
  }

}

module.exports = {
  authenticate,
  createUserByAdmin,
  getAllUsers,
  setStatusBanBlog,
  setStatusBanChat,
  getRole
}
