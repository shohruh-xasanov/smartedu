const router= require('express').Router()
const {userCreate, login,teachers, logout, contactCreate}=require('../controller/personController')
const {contact}=require('../controller/blogController')
const upload= require('../middleware/fileUploads')
router.route('/user',)
    .post(upload.single('image'),userCreate)
router.route('/login',).post(login)
router.route('/logout',).get(logout)
router.route('/contact')
    .post(contactCreate)
    .get(contact)
router.get('/teachers', teachers)

module.exports=router