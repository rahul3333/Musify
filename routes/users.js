const express=require('express');
const router=express.Router();
const user_controller=require('../controllers/users_controller');
const passport=require('passport');

router.all('/signin',user_controller.signin);
router.all('/signup',user_controller.signup);
router.all('/profile/:id',user_controller.user_profile);

router.all('/create_user',user_controller.create_user);
router.post('/create_session',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'}
),user_controller.createSession);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));  //Google will automatically determine this request
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/signup'}),user_controller.createSession);
router.all('/signout',user_controller.destroySession);
router.all('/search',user_controller.search);
module.exports=router;