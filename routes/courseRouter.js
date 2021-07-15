const router=require('express').Router()
const {courseCreate, getAll, getCourse, elementDelete}=require('../controller/courseController')
router.route('/course')
    .get(getAll)
    .post(courseCreate)
router.route('/course/:id')
    .delete(elementDelete)
router.get('/courses/:category', getCourse)
module.exports=router