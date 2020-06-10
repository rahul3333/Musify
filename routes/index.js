const express=require('express');
const router=express.Router();
const homeController=require('../controllers/homeController.js');

router.get('/',homeController.home);
router.use('/users',require('./users'));

module.exports=router;