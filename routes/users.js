const express=require('express');
const router=express.Router();
const user_controller=require('../controllers/users_controller');

router.all('/signin',user_controller.signin);
module.exports=router;