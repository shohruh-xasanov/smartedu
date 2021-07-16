const Course= require('../models/course')

// exports.getDate = async (req, res)=>{
//     let start = new Date()
//     start.setHours(0,0,0,0)
//     let end = new Date()
//     end.setHours(23,59,59,999)
//     await Course.find({createdAt:{$gt:start, $lt:end}})
//         .then(data=>{
//             res.send(data)
//         })
// }

// exports.getDays = async (req,res)=>{
//     let start = new Date()
//     start.setDate(start.getDate()-10)
//     console.log(start)
//     await Course.find({createdAt:{$gt:start}})
//         .then(date=>{
//             res.send(date)
//         })
// }

// exports.getMonth = async (req,res)=>{
//     let start = new Date()
//     start.setMonth(start.getMonth()-1)
//     // console.log(start)
//     await Course.find({createdAt:{$lt:start}})
//         .then(date=>{
//             res.send(date)
//         })
// }

// exports.getHours = async (req,res)=>{
//     let start = new Date()
//     start.setDate(start.getDate()-1)
//     console.log(start)
//     const result = Course.find({createdAt:{$gt: start}})
//     res.send(result)
// }


exports.getDate = async (req,res)=>{
    const user = await Course.find({
        createdAt: { $gte: new Date().setDate(new Date().getDate() - 1) }
    })
    res.status(200).json({success: true,count: user.length,data: user})
}