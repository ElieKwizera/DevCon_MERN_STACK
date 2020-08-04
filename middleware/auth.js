const JWT = require('jsonwebtoken');


const authorize = (req,res,next)=>
{
    const token  = req.header('x-auth-token');

    if(!token)
    {
        return res.status(401).json({
            success:false,
            message: 'Anauthorized user'
        });
    }

    try
    {
        const decoded  = JWT.verify(token,process.env.JWT_SECRET);
        
        req.user = decoded;
        next();
    }
    catch(err)
    {
        res.status(401).json({
            success:false,
            message: err.message
        });

    }

};

module.exports = authorize