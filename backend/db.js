const mongoose =require('mongoose');
const connectDB = async () =>
{
    try{
        const conn = await mongoose.connect('mongodb+srv://cns:9392@cluster0.zbbh5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
            );
        console.log(`hii:${conn.connection.host}`);
    }
    catch(error)
    {
        console.log(error);
        process.exit(1);
    }
};
module.exports = connectDB;