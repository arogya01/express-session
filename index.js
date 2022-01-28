const express=require('express');
const app = express();
const fs=require("fs");
// const key = fs.readFileSync("A:/Github/certificate/CA/localhost/localhost.decrypted.key");
// const cert = fs.readFileSync("A:/Github/certificate/CA/localhost/localhost.crt");
const session = require('express-session');
const {v4:uuidv4} = require('uuid');
const {PORT} = require('./config');
const passport=require('passport');
const connectEnsureLogin = require('connect-ensure-login');
const https=require('https');
const User=require('./user');

app.set('view engine' , 'ejs');

//configure the sessions middleware 
app.use(session({ 
    genid:function(req){
        return uuidv4();
    },
    secret:'arogya',
    resave:false,
    saveUninitialized:true,
    cookie: {maxAge : 60 * 60 * 1000 , secure: false} //1 hour 
}));

// const server=https.createServer({key,cert},app);

app.use(express.urlencoded({extended:false}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

//to use with sessions 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/signup',(req,res)=>{
    res.render('signup');
})

app.post('/signup/user',(req,res)=>{
    const newUser={
        email:req.body.email, 
        password:req.body.password
    };
  
  

})

app.get('/login',(req,res)=>{
    res.render('login');
})

app.post('/auth/login',(req,res)=>{
   const user={ 
       st:req.body.st,
       email:req.body.email, 
       password:req.body.password
   }  
   //then, it should compare the session token from the fronted 
});

app.get('/logout',(req,res)=>{

    req.logout();
    res.redirect('/');
});

app.get('/home',connectEnsureLogin.ensureLoggedIn(),(req,res)=>{
    res.render('home');
})


app.post('/login/user',passport.authenticate('local',{failureRedirect:'/'}), (req,res)=>{
    console.log(req.user);
    res.redirect('home');

});

// app.post('signup/user/', )

app.listen(PORT,()=>console.log(`this app is listening on port ${PORT}`));

