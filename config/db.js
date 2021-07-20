const mongoose=require('mongoose')
const dbUri = 'mongodb://localhost:27017/smartedu'
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