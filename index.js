const express = require("express")
const connectDB = require("./config/db.config")
const signUp = require("./routes/auth/signup.auth")
const login = require("./routes/auth/login.auth")
const authentication = require("./middleware/auth.middleware")

const app = express();

connectDB();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("hello world")
})
app.get('/home',authentication,(req,res)=>{
    res.send(`welcome home ${req.user.name} _/\\_`)
})
app.use('/',[signUp,login])

const PORT = process.env.PORT||8000;

app.listen(PORT,()=>{
    console.log(`server is running on PORT: ${PORT}`);
})