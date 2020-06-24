const express=require('express');
const router=express.Router();
const user_controller=require('../controllers/users_controller');

router.all('/signin',user_controller.signin);
router.all('/signup',user_controller.signup);

router.all('/create_user',user_controller.create_user);
router.post('/create_session',user_controller.createSession);
module.exports=router;