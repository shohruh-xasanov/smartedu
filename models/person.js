const mongoose=require('mongoose')
const Schema= mongoose.Schema;

const userSchema=new Schema({
    fullname:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
        maxlength:50
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:1000
    },
    role:{
        type:String,
        default:'Teacher',
        minlength:5,
        maxlength:50
    },
    direction:{
        type:String,
        required:true,
        minlength:4,
        maxlength:50
    },
    image:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:6,
        maxlength:50
    }
},{
    timestamps:true
}
)

const contactSchema= new Schema({
    fullname:{
        type:String,
        required:true,
        minlength:6,
        maxlength:50
    },
    course:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        minlength:6,
        maxlength:50
    },
    phone:{
        type:String,
        required:true,
        minlength:7,
        maxlength:50
    },
    description:{
        type:String,
        required:true,
        minlength:7,
        maxlength:500
    }
},{
    timestamps:true
})

module.exports.User=mongoose.model("User", userSchema);
module.exports.Contact= mongoose.model("Contact", contactSchema)