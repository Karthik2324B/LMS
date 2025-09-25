import mongoose from 'mongoose'

//Connect to mongodb

const connectDB= async()=>{
    mongoose.connection.on('connected',()=>console.log("Connected to mongodb"))
    await mongoose.connect(`${process.env.MONGODB_URI}/lms`)
    
}

export default connectDB
