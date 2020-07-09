const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/users');

passport.use(new googleStrategy({
    clientID:"605627827618-lke8kdf59h97sugaap55sk02s883l8un.apps.googleusercontent.com",//Here Enter your client ID
    clientSecret:"X_EbxG_Z2sPTpDyFdjRjTSfD",//Here Enter your Client Secret
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},

    function(access,refresh,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('Error in google Strategy : ',err);
                return;
            }
            console.log(profile);
            if(user){
                return done(null,user)
            }
            else{
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString("hex")
                },function(err,user){
                    if(err){
                        console.log('Error in google Strategy : ',err);
                        return;
                    }

                    return done(null,user);
                })
            }
        })
    }

));

module.exports=passport;
