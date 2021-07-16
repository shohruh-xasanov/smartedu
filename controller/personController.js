const User=require('../models/person').User
const Contact=require('../models/person').Contact
const Phrase= require('../models/blog').Phrase
const bcrypt=require('bcrypt')
const saltRounds=12
const jwt=require('jsonwebtoken')
const secret=require('../config/secret')

exports.userCreate=async (req,res,next)=>{
    try {
        const {fullname,password,role,direction,email}=req.body;
        const salt=await bcrypt.genSalt(saltRounds)
        const hash=await bcrypt.hash(password, salt)
        const email1=await User.findOne({email});
           if(email1){
               return res.status(500).json({msg:"bunaqa email oldindan ro'yhatda bor"})
            }
        const user= new User({fullname,role, password: hash, direction,image:`/public/uploads/${req.file.filename}`,email})
        await user.save()
        const accessToken=createAccessToken({id:user._id,roles:user.role})
    
            res.cookie('ascces_token', accessToken, {
                httpOnly:true,
                path:'/refresh_token',
                maxAge: 7*24*60*60*1000 //7d
            })
    
            res.json({accessToken})
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.login= async (req,res,next) =>{
    try{

     await User.findOne({email: req.body.email} , (error,user)=>{
         if(error){
             res.send(error)
         }else{
             if(!user) return res.status(400).json({msg:'User does not exist.'})
     
             const isMatch= bcrypt.compare(req.body.password, user.password);
             if(!isMatch) return res.status(400).json({msg:'Incorrect password.'})
     
             const accessToken=createAccessToken({id:user._id,roles:result.role})
             res.cookie('ascces_token', accessToken, {
                 httpOnly:true,
                 path:'/refresh_token',
                 maxAge: 7*24*60*60*1000 //7d
             })
     
             res.json({accessToken})
         }
     })
    
 }catch (err){
     res.status(500).json({msg:err.message})
 }
}
exports.logout= async (req,res,next)=>{
    try {
        res.clearCookie('ascces_token',{path:'/user/refresh_token'} )
        return res.json({msg:'Logged out.'})
        
    } catch (err) {
        res.status(500).json({msg:err.message})
    }
}

exports.contactCreate= async (req,res,next)=>{
    try {
        const {fullname,courseID,email,phone,description}=req.body
        const contact= new Contact({fullname,courseID,email,phone,description})
        await contact.save()
        res.status(200).send(contact)
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}

exports.teachers= async (req,res)=>{
    try {
    const phrase=await Phrase.find().populate('teachersID',['fullname','image']) 
    const all= await User.find({role:'Teacher'})
      res.status(200).render('page/teachers',{
        data:{all, phrase},
        layout:"./page/layout"
    })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}










const createAccessToken=(user)=>{
    return jwt.sign(user,secret.JWT_SECRET)
}