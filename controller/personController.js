const User=require('../models/person').User
const Contact=require('../models/person').Contact
const Phrase= require('../models/blog').Phrase
const bcrypt=require('bcrypt')
const saltRounds=12
const jwt=require('jsonwebtoken')
const secret=require('../config/secret')

exports.userCreate=async (req,res,next)=>{
    try {
        if(!req.file.filename){
            res.redirect('/admin')
        }
        const {fullname,password,role,direction,email}=req.body;
        const salt=await bcrypt.genSalt(saltRounds)
        const hash=await bcrypt.hash(password, salt)
        const email1=await User.findOne({email});
           if(email1){
               return res.status(500).redirect('/admin')
            }
        const user= new User({fullname,role, password: hash, direction,image:`/public/uploads/${req.file.filename}`,email}, err=>{
            if(err){
                res.redirect('/admin')
            }
        })
        await user.save()
        const accessToken=createAccessToken({id:user._id,roles:user.role})
        const refreshtoken=createRefreshToken({id:user._id,roles:user.role})
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly:true,
                maxAge: 7*24*60*60*1000 //7d
            })
    
            res.status(200).redirect('/admin')
    } catch (error) {
        return res.status(500).redirect('/admin')
    }
}

exports.login= async (req,res,next) =>{
    try{

     await User.findOne({email: req.body.email} , (error,user)=>{
         if(error){
             res.redirect('/login')
         }else{
             if(!user) return res.status(400).redirect('/login')
     
             const isMatch= bcrypt.compare(req.body.password, user.password);
             if(!isMatch) return res.status(400).redirect('/login')
             const refreshtoken=createRefreshToken({id:user._id,roles:user.role})
             const accessToken=createAccessToken({id:user._id,roles:user.role})
             res.cookie('refreshtoken', refreshtoken, {
                 httpOnly:false,
                 maxAge: 7*24*60*60*1000 //7d
             })
     
             res.redirect('/admin')
         }
     })
    
 }catch (err){
     res.status(500).redirect('/login')
 }
}
exports.logout= async (req,res,next)=>{
        const rf_token=req.cookies.refreshtoken;
        res.clearCookie('refreshtoken', rf_token,{path:'/refresh_token'})
        res.redirect('/login')
}

exports.refreshtoken = async (req,res,next)=>{
        const rf_token = req.cookies.refreshtoken;
    if(!rf_token){
        return res.status(400).json({msg:"Please login or register"})
    }
    jwt.verify(rf_token, secret.JWT_SECRET,(err,user)=>{
        if(err) return res.status(400).json({msg:"Please login or register"})
        const refreshtoken=createRefreshToken({id:user._id,roles:user.role})
        res.cookie('refreshtoken', refreshtoken, {
            httpOnly:true,
            path:'/refresh_token',
            maxAge: 7*24*60*60*1000 //7d
        })
        res.send(refreshtoken)
    })
    
}

exports.contactCreate= async (req,res,next)=>{
        const {fullname,course,email,phone,description}=req.body
        const contact= new Contact({fullname,course,email,phone,description})
        await contact.save()
        res.status(200).redirect('/contact')
}

exports.teachers= async (req,res)=>{
    const phrase=await Phrase.find().populate('teachersID',['fullname','image']) 
    const all= await User.find({role:'Teacher'})
      res.status(200).render('page/teachers',{
        data:{all, phrase},
        layout:"./page/layout"
    })
}

exports.allTeachers= async (req,res)=>{
    const teachers= await User.find({role:'Teacher'}).select({password:0})
      res.status(200).render('admin/teachers/index',{layout:"./admin_layout", teachers})
}

exports.teachersById = async (req,res,next)=>{
    const teachers = await User.findById({_id:req.params.id})
    res.status(200).render('admin/teachers/update',{layout:'./admin_layout',teachers})
}
exports.teacherDelete = async (req,res,next)=>{
    await User.findByIdAndDelete({_id:req.params.id})
    res.status(200).redirect('/user')
}
exports.userUpdate=async (req,res,next)=>{
    try {
        const {fullname,password,direction,email}=req.body;
        const salt=await bcrypt.genSalt(saltRounds)
        const hash=await bcrypt.hash(password, salt)
        const user = await User.findByIdAndUpdate({_id:req.params.id},{fullname, password: hash, direction,image:`/public/uploads/${req.file.filename}`,email})
        const accessToken=createAccessToken({id:user._id,roles:user.role})
            res.cookie('ascces_token', accessToken, {
                httpOnly:true,
                path:'/refresh_token',
                maxAge: 7*24*60*60*1000 //7d
            })
            res.redirect('/user')
    } catch (error) {
        return res.status(500).redirect('/user')
    }
}

exports.getAllcontact = async (req,res,next)=>{
    const contact = await Contact.find()
    res.status(200).render('admin/contact/index',{layout:'./admin_layout', contact})
}

exports.logins = async (req,res,next)=>{
    res.render('admin/login/index',{layout:'./admin/login/layout'})
}




const createAccessToken=(user)=>{
    return jwt.sign(user,secret.JWT_SECRET, {expiresIn: '7d'})
}
const createRefreshToken=(user)=>{
    return jwt.sign(user,secret.JWT_SECRET, {expiresIn: '1d'})
}