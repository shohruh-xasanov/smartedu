const router=require('express').Router()
const {courseCreate, getAll, getCourse, elementDelete}=require('../controller/courseController')
const {getDate, getHours, getMonth, getDays} = require('../controller/search')
const upload = require('../middleware/fileUploads')
router.route('/course')
    .get(getAll)
    .post(upload.single('image'), courseCreate)
router.route('/course/:id')
    .delete(elementDelete)
router.get('/courses/:category', getCourse)
router.get('/dates', getDate)

module.exports=router