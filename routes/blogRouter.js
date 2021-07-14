const router= require('express').Router()
const {eduCreate,getBlog,blogCreate,getBlogs,getMainAll,aboutCreate,phraseCreate}=require('../controller/blogController')

router.get('/',getMainAll)
router.route('/edu',)
    .post(eduCreate)

router.route('/blog',)
    .post(blogCreate)
    .get(getBlog)
router.route('/about',)
    .post(aboutCreate)

router.route('/phrase')
    .post(phraseCreate)
router.get('/blog/all',getBlogs)
module.exports=router