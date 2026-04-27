import { createContext, useEffect, useState } from "react"
import axios from 'axios'



export const StoreContext = createContext(null)

const StoreContextProvider=(props)=>{

   

    const url='http://localhost:4000';

    const [token,setToken]=useState("");

    const[food_list,setFoodList]=useState([]);
    const [cartItems,setCartItems] =useState({});

    const addToCart= async (itemId)=>{


        if(!cartItems[itemId])
        {
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

        if(token)
        {
            // console.log("hehe he he")
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
            console.log("item add ho gya hai cart me")
        }

    }

    const removeFromCart= async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))

        if(token)
            {
                // console.log("hehe he he")
                 await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
                console.log("item remove ho gya hai cart se")
            }

    }

 

 const getTotalCartAmount=()=>{
    let totalAmmount = 0;
    for(const item in cartItems)
    {
        if(cartItems[item]>0)
        {
            let itemInfo=food_list.find((product)=>product._id===item);
            totalAmmount += itemInfo.price*cartItems[item];
        }
      
    }
    return totalAmmount;
 }

//load cart ka data phle ka user ka
 const loadCartData = async (token) =>{
    const response = await axios.get(url+"/api/cart/get",{headers:{token}})
    console.log("cart data ka response->",response);
    setCartItems(response.data.cartData);//ye isliye tski jab user logged in hai to uske cart ka data bhi phle se dikje
}


 //fetch food_list from database

 const fetchFoodList = async ()=>{
    const response = await axios.get(url+"/api/food/list");
    console.log("response fetch_list ka->",response);
    setFoodList(response.data.Data);

 }

 
 

 async function loadData() {
    await fetchFoodList();
    if(localStorage.getItem("token"))
        {
             //ye isliye taki local storage ka data apan token state me save kr le taki page ko refresh krne pr bhi logout na ho
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"))
        }
}


 useEffect(()=>{
   
    loadData();

 },[])

    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,

    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;