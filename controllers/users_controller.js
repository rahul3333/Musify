const User=require('../models/users');

module.exports.signin=(req,res)=>{
    res.render('signin',{
        title:'Sign In'
    })
}

module.exports.signup=(req,res)=>{
    res.render('sign-up',{
        title:'Sign Up'
    })
}

module.exports.create_user=(req,res)=>{
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in creating user');
            res.redirect('back');
        }

        if(!user){
            User.create({
                name:req.body.name,
                password:req.body.password,
                email:req.body.email
            },function(err,created_user){
                if(err){
                    console.log('Error in creating user');
                    res.redirect('back');
                }
                console.log('User Created Successfully');
                res.redirect('/users/signin');
            })
        }
        else{
            console.log('User is already registered');
            res.redirect('back');
        }
    })   
}

module.exports.signin_user=(req,res)=>{
    User.findOne({email:req.body.email},function(err,user){
        if(user){
            if(req.body.password==user.password){
                console.log('Sign In Successful');
                res.redirect('/');
            }
            else{
                console.log('email/password is incorrect');
                res.redirect('back');
            }
        }
    })
}