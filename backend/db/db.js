import mongoose from "mongoose";
const connectDB = async () =>
{
    try{
        const conn = await mongoose.connect('mongodb+srv://cns:9392@cluster0.zbbh5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
            );
        console.log('connected')
    }
    catch(error)
    {
        console.log(error);
        process.exit(1);
    }
};
export default connectDB