const User = require('../models/user');

const jwt = require('jsonwebtoken');






//function to generate token

const genToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : '7d',
    });
};








// register
// route : post /api/auth/register

exports.register = async (req ,res ,next) => {
    const {name , email , password } = req.body;

    // if user already exists

  

    try{
          const exists = await User.findOne({email});

    if(exists)
    {
        res.status(400);// 400 = bad request
        return next(new Error('User Already Exists'));
    }

        //user.create ek function jo 
        //1. const user = new User ({name, email, password});
        //2. await user.save();
        // ye dono ka combined form hai
        // or data bhi return karta hai
        const user = await User.create({
            name,
            email,
            password,
        })
        // pre -save hook will hash the password before saving

        // now we will send response to client
        // response me data bhi bheja hai or token bhi
        res.status(201).json({
            success : true,
            data : {
                id : user._id,
                name : user.name,
                email : user.email,
                token : genToken(user._id)
            }
        });
    }
    catch(err)
    {
        next(err);
    }
};





// login

// route : post /api/auth/login

exports.login = async (req , res ,next) => {
    try { 
        const {email , password} = req.body;

        const user = await User.findOne({email});

        if(user && await user.matchPassword(password))
        {
            return res.status(200).json({
                success : true,
                data : {
                    id : user._id,
                    name : user.name,
                    email : user.email,
                    address : user.address,

                    token : genToken (user._id)
                }
            });
        }

        res.status(401); //401 - unauthorized
        next(new Error('Invalid Email or Password'));

    }
    catch(err)
    {
        next(err);
    }

};


// get profile ek or route hai jo auth ke andar aayega

// route : get /api/auth/profile

exports.getProfile = async (req,res,next) => {
    try{
        const user = req.user; // ye req.user authMiddleware ke protect se aata hai
        // vha pr humne jb token ko verify kiya tha to user ko fetch karke req.user me daal diya tha
        // tho is route pr phle protect middleware chalega fir ye chalega

        res.json({
            success: true,
            data : user
        });
    }
    catch(err)
    {
        next(err);
    }
};