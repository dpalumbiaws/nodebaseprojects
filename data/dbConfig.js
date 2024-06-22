import mongoose from 'mongoose'

const connectDB = async () =>{
  try {
    const connection = await mongoose.connect(
      process.env.MONGO_URI , {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       useCreateIndex: true,
    })
    console.log(`MongoDB connected at: ${connection.connection.host}`.yellow)
  } catch (e) {
    console.error(`Error: ${e.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB;
