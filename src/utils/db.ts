import mongoose from "mongoose";
 
export const connectDB = async()=> {
    try{
        await mongoose.connect(process.env.DATABASE_URL as string)
        .then(()=>console.log("DB Connected"))
    }catch(e){
        console.error(e)
    }
}