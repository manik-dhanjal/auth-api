const express = require("express")
const connectDB = require("./config/db.config")
const signUp = require("./routes/auth/signup.auth")
const login = require("./routes/auth/login.auth")
const authentication = require("./middleware/auth.middleware")

const app = express();

connectDB();
app.use(express.json());

app.get('/',(req,res)=>{

    res.json([
        {
            route:"/projects/auth-api/signup",
            itsUse:"to create new users",
            requestType:"POST",
            body:{ name:"name", password:"password", email:"email" },
            response:{
                "name": "Dhanjal",
                "email": "manikdhanjal2@gmail.com",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjExYWUxNGZiOWE3OGE1OTA4MGIwMjIxIiwiZW1haWwiOiJtYW5pa2RoYW5qYWwyQGdtYWlsLmNvbSIsIm5hbWUiOiJEaGFuamFsIiwiaWF0IjoxNjI5MTUxNTY3fQ.pVgv0CBYTRXdhuFLOMNjhs1vLoj9WYQ1coMS7cPg0xg",
                "message": "user is successfully signed up"
            }
        },
        {
            route:"/projects/auth-api/login",
            itsUse:"to login",
            requestType:"POST",
            body:{ password:"password", email:"email" },
            response:{
                "name": "Dhanjal",
                "email": "manikdhanjal2@gmail.com",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmlrZGhhbmphbDJAZ21haWwuY29tIiwibmFtZSI6IkRoYW5qYWwiLCJpYXQiOjE2MjkxNTE4NTd9.WNlgm0JCZaZ_eW9bNCyTkR7lavjlQXP7xiqaPpZ0RHA",
                "message": "user successfully logged in"
            }
        },
        {
            route:"/projects/auth-api/home",
            itsUse:"to login",
            requestType:"GET",
            header:{"x-access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmlrZGhhbmphbDJAZ21haWwuY29tIiwibmFtZSI6IkRoYW5qYWwiLCJpYXQiOjE2MjkxNTE4NTd9.WNlgm0JCZaZ_eW9bNCyTkR7lavjlQXP7xiqaPpZ0RHA"},
            response:"welcome home Dhanjal _/\\_"
        },
    ])
})

app.get('/home',authentication,(req,res)=>{
    res.send(`welcome home ${req.user.name} _/\\_`)
})

app.use('/',[signUp,login])

app.use(function(req, res, next) {
    res.status(404);
  
    if (req.accepts('html')) {
      res.render('404', { url: req.url });
      return;
    }
  
    if (req.accepts('json')) {
      res.json({ error: 'Not found' });
      return;
    }
  
    res.type('txt').send('Not found');
  });
const PORT = process.env.PORT||8000;

app.listen(PORT,()=>{
    console.log(`server is running on PORT: ${PORT}`);
})