const express=require('express')
const ejs=require('ejs')
const path=require('path')
const PORT= 5000
const bodyParser=require('body-parser')
const layouts=require('express-ejs-layouts')
const app=express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(layouts)
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'))

app.get('/', (req,res)=>{
    res.render('page/index',{
        layout:'./page/layout'
    })
})

app.listen(PORT, ()=>{
    console.log("localhostda ishlayapdi")
})
