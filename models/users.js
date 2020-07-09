const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    name:{
        type:String,
    }
    // likes: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Like'
    //     }
    // ]
},{
    timestamps:true
})

const User=mongoose.model('User',userSchema);
module.exports=User;