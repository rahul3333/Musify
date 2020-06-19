const express=require('express');
const router=express.Router();
const homeController=require('../controllers/homeController.js');

// router.get('/',homeController.home);
router.get('/',homeController.home_player);
router.use('/users',require('./users'));
router.use('/music',require('./music'));

module.exports=router;