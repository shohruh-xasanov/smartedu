const router= require('express').Router()
const {userCreate, login,teachers,teachersById,teacherDelete,
    getAllcontact, userUpdate,logins,allTeachers, refreshtoken,logout, contactCreate}=require('../controller/personController')
const upload= require('../middleware/fileUploads')
const Phrase = require('../models/blog').Phrase
const Course = require('../models/course')
const {isAuth,islogin} = require('../middleware/auth')
const {admin,superAdmin} = require('../middleware/admin')

router.route('/user',)
    .post(upload.single('image'),isAuth,admin,superAdmin,userCreate)
    .get(isAuth,admin,allTeachers)
router.route('/login',).post(login)
    .get(islogin,logins)
router.route('/logout',).get(isAuth,logout)
router.get('/refresh_token',refreshtoken)
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
    .get(isAuth,admin,superAdmin,teachersById)
    .delete(isAuth,admin,superAdmin,teacherDelete)
    .put(isAuth,admin,superAdmin,upload.single('image'),userUpdate)
router.get('/teachers',teachers)
router.get('/contact/all',isAuth,getAllcontact)
module.exports=router
