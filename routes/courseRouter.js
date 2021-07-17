const router=require('express').Router()
const {courseCreate, elementById, getAll, getCourse, elementDelete}=require('../controller/courseController')
const {getDate,  getDays} = require('../controller/search')
const upload = require('../middleware/fileUploads')
router.route('/course')
    .get(getAll)
    .post(upload.single('image'), courseCreate)
router.route('/course/:id')
    .delete(elementDelete)
    .get(elementById)
router.get('/courses/:category', getCourse)
router.get('/dates', getDate)

module.exports=router