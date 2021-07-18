const router= require('express').Router()
const {eduCreate,getBlog,elementById,blogCreate,getBlogs,getMainAll,aboutCreate,phraseCreate}=require('../controller/blogController')
const upload= require('../middleware/fileUploads')

router.get('/',getMainAll)
router.route('/edu')
    .post(upload.single('image'), eduCreate)

router.route('/blog',)
    .post(blogCreate)
    .get(getBlogs)
router.route('/about',)
    .post(upload.single('image'), aboutCreate)
router.route('/phrase')
    .post(upload.single('image'), phraseCreate)
router.get('/single',getBlog)
router.get('/blog/:id',elementById)
module.exports=router