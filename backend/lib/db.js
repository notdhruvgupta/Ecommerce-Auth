import mongoose from "mongoose";

const ConnectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Mongodb is connected')
    } catch (error) {
        console.log('mongosdb connection error',error)
    }
}
export default ConnectDB