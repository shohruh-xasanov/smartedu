const Course= require('../models/course')
const Phrase= require('../models/blog').Phrase

exports.courseCreate= async (req,res,next)=>{
    try {
        const {category,name,description,image,duration,price,books,bonus,teachersID}=req.body;
        const course= await Course.findOne({name})
                if(course) return res.status(400).json({msg: 'This course already exist.'})
        const newCourse= new Course({category,name,description,image:`/public/uploads/${req.file.filename}`,duration,price,books,bonus,teachersID})
        await newCourse.save()
        res.json(newCourse)
        
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}
exports.getAll=async (req,res,next)=>{
    try {
        const course= await Course.find()
        res.status(200).send(course)
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}
exports.elementDelete= async (req,res,next)=>{
    const {id}=req.params 
    const element=await Course.findById({_id: id})
        if(!element){
            return res.status(404).json({msg: "bunaqa course yo'q"})
        }
    await Course.findByIdAndDelete({_id:id})
    res.status(200).send("Kurs o'chirildi")
}

exports.getCourse = async (req,res, next)=>{
    try {
        const courses= await Course.find({category:req.params.category}).populate('teachersID')
        res.render('page/course', {
            data:{courses},
            layout:'./page/layout'
        })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}