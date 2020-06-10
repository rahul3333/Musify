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