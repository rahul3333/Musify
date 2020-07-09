const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/admin/songs');
const adminMusicSchema=new mongoose.Schema({
    admin_music_name:{
        type:String,
        text:true
    },
    singername:{
        type:String,
        text:true
    },
    duration:{
        type:Number
    },
    adminsong:{
        type:String
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    photo:{
        type:String
    }
},{
    timestamps:true
})

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        
      cb(null, file.originalname)
    }
  });

//   static methods
adminMusicSchema.statics.uploadedAvatar=multer({storage:storage}).single('adminsong');
adminMusicSchema.statics.avatarPath=AVATAR_PATH;


const AdminMusic=mongoose.model('AdminMusic',adminMusicSchema);
module.exports=AdminMusic;