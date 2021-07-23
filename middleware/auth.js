const User=require('../models/person').User
const jwt=require('jsonwebtoken')
const secret=require('../config/secret')

exports.isAuth=async (req,res,next)=>{
    try {
        const token=  req.cookies.refreshtoken
        if(!token){
            res.status(500).redirect('/err')
        }
        await jwt.verify(token, secret.JWT_SECRET,(err,decoded)=>{
          if(err){
              res.status(500).redirect('/err');
          }else{
              User.findById({_id:decoded.id})
             next();
          }
        });
    } catch (error) {
        if(error)
        res.redirect('/err')
    }
}
exports.islogin=async (req,res,next)=>{
    const token=  req.cookies.refreshtoken
    if(token){
        res.redirect('/logout')
    }
    next()
}