const router=require('express').Router()
const {courseCreate, getAll, elementDelete}=require('../controller/courseController')
router.route('/course')
    .get(getAll)
    .post(courseCreate)
router.route('/course/:id')
    .delete(elementDelete)
    
module.exports=router