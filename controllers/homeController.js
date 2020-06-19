const Music=require('../models/music');

// module.exports.home=(req,res)=>{
//     res.render('home',{
//         title:'HomePage'
//     })
// }

module.exports.home_player=(req,res)=>{
    
    Music.find({},(err,music)=>{
        if(err){
            console.log('Error occurred');
            res.redirect('back');
        }
        console.log(music);
        
        res.render('home',{
            title:'HomePage',
            music:music
        })
    })
}