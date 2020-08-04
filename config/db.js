const Mongoose = require('mongoose')

const connectDB = async ()=>
{
    try {
       await Mongoose.connect(process.env.MONGO_DB_URI, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex:true
            },()=>
            {
                console.log('Connected to MongoDB');
                
            });
        
    } catch (error) {
        console.error(error);
        process.exit(1);
        
    }
}

module.exports = connectDB;
