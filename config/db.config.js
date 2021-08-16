const mongoose  = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


const connectDB = async() => {

    const MONGO_DB = process.env.NODE_ENV==="production"?
                        process.env.MONGO_DB
                        :'mongodb://localhost:27017/auth-api';
    
    try{
        const conn =  await mongoose.connect(MONGO_DB,{
                useUnifiedTopology: true,
                useNewUrlParser:true,
                useCreateIndex:true,
            })
        console.log(`MongoDB connected ${conn.connection.host}`)
    }
    catch(error){
        console.log(`Error in making connection with DB: ${error}`);
        process.exit(1);
    }

}

module.exports = connectDB