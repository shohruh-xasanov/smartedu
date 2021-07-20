const router= require('express').Router()
const {userCreate, login,teachers,teachersById,teacherDelete, userUpdate,allTeachers, logout, contactCreate}=require('../controller/personController')
const upload= require('../middleware/fileUploads')
const Phrase = require('../models/blog').Phrase
const Course = require('../models/course')

router.route('/user',)
    .post(upload.single('image'),userCreate)
    .get(allTeachers)
router.route('/login',).post(login)
router.route('/logout',).get(logout)
router.route('/contact')
    .post(contactCreate)
    .get(async (req,res)=>{
        const phrase = await Phrase.find().populate('teachersID',['fullname','image'])
        const course = await Course.find()
        res.render('page/contact',{
            data:{ phrase, course},
            layout:'./page/layout'
        })
    })
router.route('/user/:id')
    .get(teachersById)
    .delete(teacherDelete)
    .put(upload.single('image'),userUpdate)
router.get('/teachers', teachers)

module.exports=router