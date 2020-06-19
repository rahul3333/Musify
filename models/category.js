const mongoose=require('mongoose');
const categorySchema=new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    avatar:{
        type:String
    },
    music:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Music'
        }
    ]
},{
    timestamps:true
});

const Category=mongoose.model('Category',categorySchema);
module.exports=Category;