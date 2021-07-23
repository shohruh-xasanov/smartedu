const User=require('../models/person').User
const jwt=require('jsonwebtoken')
const secret=require('../config/secret')
exports.superAdmin=(req,res,next)=>{
    let token=req.cookies.refreshtoken;
    if(!token){
        return res.status(401).redirect('/err')
    }
    const decoded=jwt.verify(token, secret.JWT_SECRET)
    if(decoded.roles==="admin"||decoded.roles==="Teacher"){
        return res.status(401).redirect('/err')
    }if(decoded.roles==="superAdmin"){
         next();
    }  
}

exports.admin=(req,res,next)=>{
    let token=req.cookies.refreshtoken;
    const decoded=jwt.verify(token, secret.JWT_SECRET)
    console.log(decoded)
    if(!token){
        return res.status(401).redirect('/err')
    }if(decoded.roles==="Teacher"){
        return res.status(401).redirect('/err')
    }if(decoded.roles==="admin"||decoded.roles==="superAdmin"){
         next();
    }  
}