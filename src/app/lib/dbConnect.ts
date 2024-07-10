import mongoose from "mongoose";

type ConnectionObject ={
    isConnected ?:number,
}

const connection : ConnectionObject  = {}

// async function used because db dusre continent me hai , aane me time lagega

async function dbConnect ():Promise<void>{
    if (connection.isConnected){
        console.log("already connected to database");
        return 
    }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI ||'',{})

       connection.isConnected =  db.connections[0].
       readyState
// ye wala dekho -> seekhne ke liye 
       console.log("DB connected Succesfully");

  } catch (error) {

    console.log("database connection failed",error);

    process.exit(1)
    
  }
}

export default dbConnect ;