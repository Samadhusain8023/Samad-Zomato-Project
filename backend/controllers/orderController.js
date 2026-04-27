import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// place user order for frontend

const placeOrder = async (req,res) =>{
   
  const frontend_url = "https://samad-zomato-project-frontend-1.onrender.com"

    try{
        const newOrder = new orderModel({
            userId:req.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })

        //ye database me save kr rhe hai
        await newOrder.save();

        console.log("order database me save ho gya hai")

        //ye payment link create krne k liye for stripe
        //stripe ko sab ek items ek specific format me chahiye isliye niche wali line use kr rhe hai
        const line_items = req.body.items.map((item)=>(
            {
                price_data:{
                    currency:"inr",
                    product_data:{
                        name:item.name
                    },
                    unit_amount:item.price*100
                },
                quantity:item.quantity

            }
        ))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:50*100
            },
            quantity:1
        })


        //ye payment krne k liye link taiyar kr rhai hai 
        // Stripe creates a hosted payment page for you and returns:
        //or use response me return krta hai response.url k andar

        // sessions mtlb one payment instance (one transaction attempt) is link se ek bar hi payment hoga
        // "payment" → Pay once 💰
        // "subscription" → Pay again & again 🔁
        // "setup" → Save card 💳


        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment', //isk mtlb ek bar payment krna hai agr ye dusra hota  subscription ya setup to uper dekho
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

       return  res.json({
            success:true,
            session_url:session.url
        })

    }
    catch(error)
    {
        console.log("ye kya ho gya->",error);
        return res.json({
            success:false,
            message:error
        })


    }
}


const verifyOrder = async (req,res)=>{

    const {orderId,success} = req.body;
    

    try{
        if(success === true || success === "true"){

            await orderModel.findByIdAndUpdate(orderId,{payment:true});

            //ab payment successful hone k bad apan cart ko khali kr rhe hai
             
            const order = await orderModel.findById(orderId);
            
            await userModel.findByIdAndUpdate(order.userId,{
                cartData: {}
                });


           return res.json({
                success:true,
                message:"Payment ho gya hai"
            })

        }
        else{
            await  orderModel.findByIdAndDelete(orderId);
            return res.json({
                success:false,
                message:"Not Paid"
            })

        }

    }
    catch(error)
    {
        console.log(error);
        return res.json({
            success:false,
            message:error
        })

    }
}



// ek user k sabhi orders user order for frontend
const userOrders = async (req,res)=>{
    try{
        //mongodb  already have time indormation in id so we are sorting in decending order using _id
        const orders = await orderModel.find({userId:req.userId}).sort({ _id: -1 })

       return res.json({
            success:true,
            data:orders
        })

    }
    catch(error)
    {
        console.log("userOrder ki error->",error);
        return res.json({
            success:false,
            message:error
        })
    }

}

//listing orders for admin panel
const listOrders = async (req,res)=>{
    try{
        const orders = await orderModel.find({}).sort({ _id: -1 });

        return res.json({
            success:true,
            data:orders
        })

    }
    catch(error){
        console.log(error);

        return res.json({
            success:false,
            message:error
        })
    }

}


// api updating the order status

const updateStatus = async (req,res)=>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})

        return res.json({
            success:true,
            message:"status updated"
        })

    }
    catch(error){
        console.log(error);

        return res.json({
            success:false,
            message:error
        })

    }



}


export { placeOrder , verifyOrder , userOrders ,listOrders, updateStatus }
