const Course= require('../models/course')
const User = require('../models/person').User
const Blog = require('../models/blog').Blog
exports.searchCourse = async (req,res,next)=>{
    let searchCourses = new RegExp(req.query.name);
    const result = await Course.find().or([
        { ['name'] : {$regex: searchCourses, $options: 'i'} },
        { ['description'] : {$regex: searchCourses, $options: 'i'}},
    ]);
    if(!result){
        res.status(500).render('admin/error/404',{
            layout:'./admin_layout'
        })
    }
    res.render('admin/search/index',{
        layout:'./admin_layout',
        result
    });
}

// exports.getDate = async (req,res)=>{
//     const user = await Course.find({
//         createdAt: { $gte: new Date().setDate(new Date().getDate() - 1) }
//     })
//     res.status(200).json({success: true,count: user.length,data: user})
// }

exports.getAllData = async (req,res,next)=>{
    const teacher = await User.find({role:'Teacher'}).countDocuments()
    const teachers = await User.find({role:'admin'})
    const admin = await User.find({role:'admin'})
    const blog = await Blog.find().countDocuments()
    const course = await Course.find().countDocuments()
    res.status(200).render('admin/dashboard',{layout:'./admin_layout',teachers,teacher,admin,blog,course })
}