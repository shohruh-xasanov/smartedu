const express=require('express')
const ejs=require('ejs')
const connectDB=require('./config/db')
const PORT= process.env.PORT||5000
const path= require('path')
const methodOverride = require('method-override')
const bodyParser=require('body-parser')
const layouts=require('express-ejs-layouts')
const app=express()
const cookieParser = require('cookie-parser')
connectDB()

app.use(methodOverride('_method',{
    methods:['POST', 'GET']
}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(layouts)
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'))
app.use('/public/uploads', express.static('public/uploads'))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/courseRouter'))
app.use('/', require('./routes/blogRouter'))
app.use('/', require('./routes/personRouter'))
app.listen(PORT, ()=>{
    console.log("localhostda ishlayapdi")
})

app.get('/price', (req,res)=>{
    res.render('page/pricing',{
        layout:'./page/layout'
    })
})

app.get('/err', (req,res)=>{
    res.render('admin/error/pages-500',{layout:'./admin/error/layout'})
})
