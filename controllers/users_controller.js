const User=require('../models/users');

module.exports.signin=(req,res)=>{
    
    res.render('signin',{
        title:'Sign In',
        path:req.route.path
    })
}

module.exports.signup=(req,res)=>{
    res.render('sign-up',{
        title:'Sign Up',
        path:req.route.path
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

module.exports.createSession=(req,res)=>{
    console.log('Logged in Successfully');
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in finding user in signUp');
            return;
        }
        if(user){
            if(user.password!=req.body.password){
                console.log('here in comp pass');
            }
            res.cookie('user_id',user.id);
            res.redirect('/');
        }
        else{
             res.redirect('/')
        }
    })
}