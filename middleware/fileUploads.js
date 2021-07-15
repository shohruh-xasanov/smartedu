const multer=require('multer')
const path= require('path')
const md5=require('md5')

const storage= multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb)=>{
        let ext= path.extname(file.originalname)
        cb(null, md5(Date.now()) + ext)
    }
})

const  upload = multer ({
    storage: storage,
    fileFilter: (req, file, cb)=>{
        let ext= path.extname(file.originalname)
        if(
            ext == '.jpg' || ext == '.png'
        ){
            cb(null, true)
        }else{
            res.status(500).json({msg: "Only jpg & png file supported"})
            cb(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports= upload