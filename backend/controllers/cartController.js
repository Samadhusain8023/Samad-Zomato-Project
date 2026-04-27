import userModel from "../models/userModel.js";


//add items to user cart
const addToCart = async (req,res)=>{

    

    try{
        let userData = await userModel.findById(req.userId);

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }



        let cartData= await userData.cartData;
        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId]=1;
        }
        else{
            cartData[req.body.itemId]+=1;

        }

        await userModel.findByIdAndUpdate(req.userId,{cartData});
       return  res.json({
            success:true,
            message:"Added to cart"
        });

        console.log(" add to cart k backend me koi problem nhi hai")

    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:error
        });

    }

}

//remove items from user cart
const removeFromCart = async (req,res)=>{

    try{
        let userData = await userModel.findById(req.userId);

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }



        let cartData= await userData.cartData;
        if(cartData[req.body.itemId]>0)
        {
            cartData[req.body.itemId]-=1;
        }
       
      await userModel.findByIdAndUpdate(req.userId,{cartData});


       return  res.json({
            success:true,
            message:"Removed From cart"
        });

    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:error
        });

    }
    
}

//fetch user cart data
const getCart = async (req,res)=>{
    try{
        let userData = await userModel.findById(req.userId);

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }



        let cartData= await userData.cartData;
       
       return  res.json({
            success:true,
            cartData:cartData,
        });

    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:error
        });

    }
    
}

export {addToCart,removeFromCart,getCart}