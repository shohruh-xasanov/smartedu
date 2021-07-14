const mongoose=require('mongoose')
const Schema=mongoose.Schema

const courseSchema= new Schema({
    category:{
        type:String,
        required:true,
        minlength:4,
        maxlength:100
    },
    name:{
        type:String,
        required:true,
        minlength:6,
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
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    price:{
        type:String, 
        required:true
    },
    books:{
        type:String, 
        required:true
    },
    bonus:{
        type:String, 
        required:true
    },
    teachersID:{
        type:mongoose.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true
}
)

module.exports=mongoose.model("Course", courseSchema)