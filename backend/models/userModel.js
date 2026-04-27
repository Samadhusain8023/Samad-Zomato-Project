import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        
    },
    cartData:{
        type:Object,
        default:{},
        
    }

},{minimize:false})  //agr false nhi denge this cart data will not be created qki apno ne koi data nhi diya hai

const userModel=mongoose.model.user || mongoose.model("user",userSchema);

export default userModel;