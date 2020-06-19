const mongoose=require('mongoose');
const playlistSchema=new mongoose.Schema({
    music:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Music'
    },
    name:{
        type:String
    }
},{
    timestamps:true
})

const Playlist=mongoose.model('Playlist',playlistSchema);
module.exports=Playlist;