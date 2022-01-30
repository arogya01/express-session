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

const UserSchema=new Schema({
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

UserSchema.plugin(passportLocalMongoose); // this particualar line of code encrypts the password. 


// UserDetails.register({username:'candy' , active:false} , 'arogya');
const User = module.exports=mongoose.model('userData' , UserSchema);

module.exports.getUserByID=(id,callback) => { 
   User.findById(id,callback);
}

module.exports.addUser = function(newUser, callback){
    const user = new User(newUser);

    user.save(callback);
}


