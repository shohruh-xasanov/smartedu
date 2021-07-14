const router= require('express').Router()
const {userCreate, login,teachers, logout, contactCreate}=require('../controller/personController')
const {contact}=require('../controller/blogController')
router.route('/user',)
    .post(userCreate)
router.route('/login',).post(login)
router.route('/logout',).get(logout)
router.route('/contact')
    .post(contactCreate)
    .get(contact)
router.get('/teachers', teachers)

module.exports=router