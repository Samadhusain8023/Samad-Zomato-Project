import foodModel from "../models/foodmodel.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {

   
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    
    if (!req.file) {
        return res.json({
            success: false,
            message: "File not received"
        });
    }

    let image_filename = req.file.filename;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    });

    try {
        await food.save();
        res.json({
            success: true,
            message: "Food Added"
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        });
    }
};

// all food list
const listFood = async (req,res)=>{

    try{
        const foods = await foodModel.find({});
        res.json({
            success:true,
            Data:foods,
        })

    }
    catch(error)
    {
        console.log(error);
        res.json({
            success:false,
            message:Error,
        })

    }

}


//remove food item

const removeFood = async (req,res)=>{

    try{
        console.log("samad mahan hai");
        const food = await foodModel.findById(req.body.id)
        console.log("food ->",food)
         fs.unlink(`uploads/${food.image}`,()=>{}) //folder me se image delete krne k liye

         await foodModel.findByIdAndDelete(req.body.id);
         res.json({
            success:true,
            message:"Food removed"
         })
    }
    catch(error)
    {
        console.log(error);
        res.json({
            success:false,
            message:"Error"

        })

    }

}








export { addFood , listFood , removeFood };