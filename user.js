const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
const { stringify } = require('uuid');

mongoose.connect('mongodb://localhost/node-user-login',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(
    console.log('mongodb connected bruh!!')
);

const Schema=mongoose.Schema;

const User=new Schema({
  username:{
      type:String, 
      required:true,
  },
  password:{
      type:String, 
      required:true,
  }
});

//passport-local automatically hashed and salts the passwords 

User.plugin(passportLocalMongoose);

// UserDetails.register({username:'candy' , active:false} , 'arogya');

module.exports.getUserByID=(id,callback) => { 
   User.findById(id,callback);
}

module.exports.addUser = function(newUser, callback){
    
}

module.exports=mongoose.model('userData' , User , 'userData');

