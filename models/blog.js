const mongoose=require('mongoose')
const Schema=mongoose.Schema

const eduSchema=new Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:100
    },
    title:{
        type:String,
        required:true,
        minlength:6,
        maxlength:100
    },
    image:{
        type:String,
        required:true
    },
},{
    timestamps:true
})

const blogSchema=new Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:100
    },
    title:{
        type:String,
        required:true,
        minlength:6,
        maxlength:100
    },
    image:{
        type:String,
        required:true
    },
},{
    timestamps:true
})
const aboutSchema=new Schema({
    title:{
        type:String,
        required:true,
        minlength:5,
        maxlength:100
    },
    description:{
        type:String,
        required:true,
        minlength:6,
        maxlength:100
    },
    image:{
        type:String,
        required:false
    },
},{
    timestamps:true
})

const phraseSchema= new Schema({
    title:{
        type:String,
        required:true,
        minlength:6,
        maxlength:100
    },
    teacherID:{
        type:mongoose.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true
})

module.exports.Edu=mongoose.model("Edu", eduSchema);
module.exports.Blog=mongoose.model("Blog", blogSchema);
module.exports.About=mongoose.model("About", aboutSchema);
module.exports.Phrase=mongoose.model("Phrase", phraseSchema);