const bcrypt  = require('bcryptjs');
const User = require('../models/User');



exports.getUser = async(req,res,next)=>
{
    try {
        const user  = await User.findById(req.user.id).select('-password');
    
        res.status(200).json({
            success:true,
            data:user
        });
        
    } catch (error) {
        console.error(error);
        res.status(200).json({
            success:false,
            message:error.message
        });
    } 

};

exports.login = async (req,res,next)=>
{
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user)
    {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if(!passwordMatch)
    {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }

    token = user.getWebToken();

    res.status(202).json({
        token
    });
};
