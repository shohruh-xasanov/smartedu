const mongoose=require('mongoose')
const dbUri='mongodb+srv://Shohruh:349672@cluster0.pelmz.mongodb.net/smartedu?retryWrites=true&w=majority'
const connectDB=async ()=>{
    const conn=await mongoose.connect(dbUri,{
        useFindAndModify:false,
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
      console.log(`MongoDB Connected ${conn.connection.host}`)
}

module.exports=connectDB