const Edu=require('../models/blog').Edu
const Blog= require('../models/blog').Blog
const About= require('../models/blog').About
const Phrase= require('../models/blog').Phrase
const User=require('../models/person').User
const Contact=require('../models/person').Contact
const Course=require('../models/course')
exports.eduCreate=async (req,res,next)=>{
    try {
        const {name, title }=req.body;
        const edu1= new Edu({name, title, image:`/public/uploads/${req.file.filename}`})
        await edu1.save()
        res.status(200).send(edu1)
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}
exports.blogCreate= async (req,res,next)=>{
    try {
    const {name,title}= req.body
    const blog= new Blog({name,title, image:`/public/uploads/${req.file.filename}`})
    await blog.save()
    res.status(200).send(blog)
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.aboutCreate= async (req,res,next)=>{
    try {
        const {title, description}=req.body
        const about= new About({title, description, image:`/public/uploads/${req.file.filename}`})
        await about.save()
        res.status(200).send(about)
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.phraseCreate=async (req,res,next)=>{
    try {
        const {title,teachersID}=req.body;
        const phrase= new Phrase({title,teachersID})
        await phrase.save()
        res.status(200).send(phrase)
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}


exports.contact= async (req,res)=>{
    try {
        const phrase= await Phrase.find().populate('teachersID',['fullname','image'])
        const contact= await Contact.find()
        res.status(200).render('page/contact',{
            data:{contact, phrase},
            layout:'./page/layout'
        }) 
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}
exports.getBlog= async (req,res)=>{
    try {
        const phrase= await Phrase.find().populate('teachersID',['fullname','image'])
        const blog= await Blog.find()
        .limit(6)
    res.status(200).render('page/blog-single',{
        data:{phrase, blog},
        layout:'./page/layout'
    })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}
exports.getBlogs= async (req,res)=>{
    try {
        const blog= await Blog.find().limit(6)
        const phrase= await Phrase.find().populate('teachersID',['fullname','image'])
    res.status(200).render('page/blog',{
        data:{blog, phrase},
        layout:'./page/layout'
    })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.getMainAll= async (req,res)=>{
    try {
    const edu= await Edu.find()
    const aboutlast= await About.find()
    const about= await About.find().limit(8)
    const contact= await Contact.find().countDocuments()
    const course= await Course.find().countDocuments()
    const teacher= await User.find().countDocuments()
    const phrase= await Phrase.find().populate('teachersID',['fullname','image'])
    res.status(200).render('page/index',{
        data:{edu,aboutlast,about,contact,course,teacher,phrase},
        layout:'./page/layout'
    })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}