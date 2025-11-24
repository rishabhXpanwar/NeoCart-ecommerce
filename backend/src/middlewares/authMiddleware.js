const jwt = require('jsonwebtoken');

const User = require('../models/user');


//protect middleware to check token validity
const protect = async (req, res, next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];

}

if(!token)
{
    res.status(401);
    next(new Error('No Token , Authorization denied'));
}
// now we will validate the token
     try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);

         // decoded object looks like → { id: "userid_here", iat: ..., exp: ... }

    // Now fetch user from DB using the id stored inside the token
    // .select('-password') removes password from returned user data

        req.user = await User.findById(decoded.id).select('-password');
        next();
     }
     catch(error)
     {
        res.status(401);
        next(new Error('Token is not valid'));
     }


};



// now to check whether the user is admin or not

const admin = (req,res,next) => {

    if(req.user && req.user.role === 'admin')
    {
        next();
    }
    else{
        res.status(403);// 403 - not allowed
        next(new Error('This path is only for Admins'));
        }
};

module.exports = {protect , admin};