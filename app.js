const express=require('express')
const ejs=require('ejs')
const path=require('path')
const connectDB=require('./config/db')
const PORT= 5000
const bodyParser=require('body-parser')
const layouts=require('express-ejs-layouts')
const app=express()
connectDB()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(layouts)
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'))

app.use('/', require('./routes/courseRouter'))
app.use('/', require('./routes/blogRouter'))
app.use('/', require('./routes/personRouter'))
app.listen(PORT, ()=>{
    console.log("localhostda ishlayapdi")
})
