import jwt from "jsonwebtoken"


const authMiddleware = async (req,res,next)=>{

    const {token}=req.headers;
    if(!token){
       return res.json({
            success:false,
            message:"Not Authorized Login Again"
        })

    }

    try{
        // console.log("yha tak sab theek hai");

        const token_decode = jwt.verify(token,process.env.JWT_SECRET);

        // console.log("decoded token->",token_decode);
      
        //important
        //hamesha ye use kro taki ye sabhi get put post delete sabke liye kam kre
        //na ki req.body.userId=token_decode.id
        //mtlb user ki id ko request me pass kro na ki body me
        
        req.userId = token_decode.id; 
        

        next();


    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"Token verify nhi hua hai"
        })



    }

}

export default authMiddleware;






















