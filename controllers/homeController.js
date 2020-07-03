const Music=require('../models/music');

// module.exports.home=(req,res)=>{
//     res.render('home',{
//         title:'HomePage'
//     })
// }

module.exports.home_player=(req,res)=>{
    let record=null;
    Music.find({},(err,music)=>{
        if(err){
            console.log('Error occurred');
            res.redirect('back');
        }
        
        res.render('landing',{
            title:'Musify',
            music:music,
            path:req.route.path,
            record:record
        })
    })
}