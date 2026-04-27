import express from "express"
import cors from "cors" //ye permission k liye frontend or backend ko jodne k liye
import database from './config/database.js'
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import dotenv from "dotenv";

dotenv.config();



// app config

const app=express()
const port= process.env.PORT || 4000


// middleware
app.use(express.json())
app.use(cors()) 

// db connection
 database.connect();


//api end point
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))  //ye taki apan server pr /images/image ka name likh kr image ko access kr sakr
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get('/',(req,res)=>{
    res.send("api working ")

})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})
