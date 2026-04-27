import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// login user
const loginUser = async (req,res)=>{
    const {email,password}=req.body;
    
    try{
        const user = await userModel.findOne({email})
        if(!user)
        {
            res.json({
                success:false,
                message:"User Does not exists"
            })
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch)
        {
            res.json({
                success:false,
                message:"incorrect password"
            }) 
            toast.error("incorrect password");
        }

        const token = createToken(user._id);
  

        res.json({
            success:true,
            token:token
        }) 


        
    }
    catch(error){
        res.json({
            success:false,
            message:"Error"
        })

    }

}


//create token function
const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


//signup user register user

const registerUser =async (req,res)=>{
    const {name,email,password}=req.body;

    try{//checking user already exist
        const exist = await userModel.findOne({email});

        if(exist){
            return res.json({
                success:false,
                message:"User Already exist"
            })
        }

        //validate email format  & strong password

        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:"email is not valid"
            })

        }

        if(password.length<8)
            return res.json({
                success:false,
                message:"Please Enter an Strong password"
            })

        //hashing user password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword

        })

       const user =  await newUser.save();

        
        const token =createToken(user._id);

        res.json({
            success:true,
            "token":token
        })



    }catch(error)
    {
       console.log(error);
       res.json({
        success:false,
        message:"Error"
    })

    }


}


export {loginUser,registerUser};