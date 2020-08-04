const User  = require('../models/User');
const gravatar = require('gravatar');



exports.register = async (req,res,next) =>
{
    const {username,email,password} = req.body;

    try 
    {
        let user = await User.findOne({email});
        if(user)
        {
            return res.status(404).json(
                {
                    success: false,
                    message:'User already exists'
                }
            );
        }
       const avatar = gravatar.url(email,{
           s:'200',
           r: 'pg',
           d: 'mm'
       });

       user = await User.create({username,email,password,avatar});
       token = user.getWebToken();

       res.status(200).json(
        {
            success: true,
            token
        }
    );

    } 
    catch (error) 
    {
        res.status(500).json(
            {
                success: false,
                message:error.message
            }
        );
    }
   
};
