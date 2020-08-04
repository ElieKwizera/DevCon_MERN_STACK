const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const UserSchema = new  mongoose.Schema({
    username: 
    {
        type:String,
        required:[true, 'please provide the username']
    },
    email:
    {
        type:String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please include a valid email"],
        required:[true,'Please provide the email'],
        unique: [true,'Please Enter a valid email']
    },
    password:
    {
        type:String,
        required:[true,'Please provide password'],
        minlength:[6,'Password must be at least 6 characters']
    },
    avatar:
    {
        type:String
    },
    createdAt:
    {
        type:Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function (next)
    {
        if (!this.isModified('password'))
        {
            next();
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt);
        next();
    }

);

UserSchema.methods.getWebToken = function()
{
    return JWT.sign({id:this._id},process.env.JWT_SECRET,
        {
            expiresIn: 360000
        });
};


module.exports = mongoose.model('User',UserSchema);

