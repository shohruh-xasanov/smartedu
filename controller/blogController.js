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
        res.status(200).redirect('/edu')
    } catch (error) {
        return res.status(500).redirect('/edu')
    }
}
exports.blogCreate= async (req,res,next)=>{
    try {
    const {name,title}= req.body
    const blog= new Blog({name,title, image:`/public/uploads/${req.file.filename}`})
    await blog.save()
    res.status(200).redirect('/blog/all')
    } catch (error) {
        return res.status(500).redirect('/blog/all')
    }
}

exports.aboutCreate= async (req,res,next)=>{
    try {
        const {title, description}=req.body
        const about= new About({title, description, image:`/public/uploads/${req.file.filename}`})
        await about.save()
        res.status(200).redirect('/about')
    } catch (error) {
        return res.status(500).redirect('/about')
    }
}

exports.phraseCreate=async (req,res,next)=>{
    try {
        const {title,teachersID}=req.body;
        const phrase= new Phrase({title,teachersID})
        await phrase.save()
        res.status(200).redirect('/phrase')
    } catch (error) {
        return res.status(500).redirect('/phrase')
    }
}


exports.getBlog= async (req,res)=>{
    try {
        const course = await Course.find().limit(6)
        const phrase= await Phrase.find().populate('teachersID',['fullname','image'])
        const blog= await Blog.find().sort({createdAt:-1})
            .limit(1)
    res.status(200).render('page/blog-single',{
        data:{phrase,course, blog},
        layout:'./page/layout'
    })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

exports.elementById= async (req,res,next)=>{
    try {
        const {id}=req.params 
        const course = await Course.find().limit(6)
        const phrase = await Phrase.find().populate('teachersID','fullname').sort({createdat:-1})
        const blog=await Blog.findById({_id: id}).populate('teachersID', '-password')
            if(!blog){
                return res.status(404).json({msg: "bunaqa blog yo'q"})
            }
        res.render('page/news',{
            data:{blog,course, phrase},
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

exports.blogById = async (req,res,next)=>{
    const blog = await Blog.findById({_id:req.params.id})
    res.status(200).render('admin/news/update',{layout:'./admin_layout',blog})
}
exports.allBlog = async (req,res,next)=>{
    const blog = await Blog.find()
    res.status(200).render('admin/news/index',{layout:'./admin_layout', blog})
}
exports.blogDelete = async (req,res,next)=>{
    await Blog.findByIdAndDelete({_id:req.params.id})
    res.status(200).redirect('/blog/all')
}
exports.blogUpdate = async (req,res,next)=>{
    try {
    const {name,title}= req.body
    await Blog.findByIdAndUpdate({_id:req.params.id},{name,title, image:`/public/uploads/${req.file.filename}`})
    res.status(200).redirect('/blog/all')
    } catch (error) {
        return res.status(500).redirect('/blog/all')
    }
}

exports.phraseById = async (req,res,next)=>{
    const teachers = await User.find().select({fullname:1})
    const phrase = await Phrase.findById({_id:req.params.id})
    res.status(200).render('admin/phrase/update',{layout:'./admin_layout',teachers, phrase})
}

exports.getAllPhrase = async (req,res,next)=>{
    const teachers = await User.find().select({fullname:1})
    const phrase = await Phrase.find().populate('teachersID',['fullname'])
    res.status(200).render('admin/phrase/index',{layout:'./admin_layout', teachers,phrase})
}
exports.phraseDelete = async (req,res,next)=>{
    await Phrase.findByIdAndDelete({_id:req.params.id})
    res.status(200).redirect('/phrase')
}
exports.phraseUpdate = async (req,res,next)=>{
    try {
    const {title,teachersID}= req.body
    await Phrase.findByIdAndUpdate({_id:req.params.id},{title,teachersID})
    res.status(200).redirect('/phrase')
    } catch (error) {
        return res.status(500).redirect('/phrase')
    }
}

exports.aboutById = async (req,res,next)=>{
    const about = await About.findById({_id:req.params.id})
    res.status(200).render('admin/about/update',{layout:'./admin_layout', about})
}

exports.getAllAbout = async (req,res,next)=>{
    const about = await About.find()
    res.status(200).render('admin/about/index',{layout:'./admin_layout', about})
}
exports.aboutDelete = async (req,res,next)=>{
    await About.findByIdAndDelete({_id:req.params.id})
    res.status(200).redirect('/about')
}
exports.aboutUpdate = async (req,res,next)=>{
    try {
    const {title,description}= req.body
    await About.findByIdAndUpdate({_id:req.params.id},{title,description,image:`/public/uploads/${req.file.filename}`})
    res.status(200).redirect('/about')
    } catch (error) {
        return res.status(500).redirect('/about')
    }
}

exports.sliderById = async (req,res,next)=>{
    const slider = await Edu.findById({_id:req.params.id})
    res.status(200).render('admin/slider/update',{layout:'./admin_layout', slider})
}
exports.getAllSlider = async (req,res,next)=>{
    const slider = await Edu.find()
    res.status(200).render('admin/slider/index',{layout:'./admin_layout', slider})
}
exports.sliderDelete = async (req,res,next)=>{
    await Edu.findByIdAndDelete({_id:req.params.id})
    res.status(200).redirect('/edu')
}
exports.sliderUpdate = async (req,res,next)=>{
    try {
    const {name,title}= req.body
    await Edu.findByIdAndUpdate({_id:req.params.id},{name,title,image:`/public/uploads/${req.file.filename}`})
    res.status(200).redirect('/edu')
    } catch (error) {
        return res.status(500).redirect('/edu')
    }
}
