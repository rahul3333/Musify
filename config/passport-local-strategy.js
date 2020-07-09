const passport=require('passport');
const User=require('../models/users');

const LocalStrategy= require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
    },
    function(req,email,password,done){
        User.findOne({email:email},function(err,user){
            if(err){
                // req.flash('error',err);
                console.log('error : ',err);
                return done(err);
            }
            if(!user || user.password!= password){
                // req.flash('error','Invalid Username/Password');
                console.log('Invalid Username/Password');
                return done(null,false)
            }
            return done(null,user)
        })
    }
));

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user');
            return done(err);
        }
        return done(null,user);
    });
});

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user
        // req.user contains the current logged in user from the session cookie.
    }
    next();
}
module.exports=passport;