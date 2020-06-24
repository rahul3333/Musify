const express=require('express');
const Music=require('../models/music');
const router=express.Router();
const music_controller=require('../controllers/music_controller');

router.all('/upload_song_info',music_controller.upload_info);
router.all('/uploadPage',music_controller.uploadPage);
router.all('/uploadSong/:name',music_controller.uploadSong);
router.all('/upload_song/:id',music_controller.upload_song);
router.all('/admin/upload',music_controller.Adminupload);
router.all('/uploadSongInfoAdmin',music_controller.uploadSongInfoAdmin);
router.all('/uploadSongAdmin/:name',music_controller.uploadSongAdmin);
module.exports=router;