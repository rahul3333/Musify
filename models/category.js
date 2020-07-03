const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/category_avatar');

const categorySchema=new mongoose.Schema({
    category_name:{
        type:String
    },
    description:{
        type:String
    },
    adminmusic:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'AdminMusic'
        }
    ],
    image:{
        type:String
    }
},{
    timestamps:true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        
      cb(null, file.originalname)
    }
  });

//   static methods
categorySchema.statics.uploadedAvatar=multer({storage:storage}).single('image');
categorySchema.statics.avatarPath=AVATAR_PATH;

const Category=mongoose.model('Category',categorySchema);
module.exports=Category;