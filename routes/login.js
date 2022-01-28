const express=require('express');
const app = express();
const session = require('express-session');
const {v4:uuidv4} = require('uuid');

//configure the sessions middleware 
app.use(session({
    genid:function(req){
        return uuidv4();
    },
    secret='arogya',
    resave:false,
    saveUninitialized:true
}));

app.get('/',(req,res)=>{
    res.send(req.sessionID);
});

const port=9000;

app.listen(port,()=>console.log(`this app is listening on port 9000`));
