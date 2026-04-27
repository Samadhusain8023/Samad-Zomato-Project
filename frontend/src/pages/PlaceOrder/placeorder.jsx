import React, { useContext, useEffect, useState  } from 'react'
import './placeorder.css'
import { StoreContext } from '../../context/storecontext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const placeorder = () => {

  const {getTotalCartAmount, token, food_list, cartItems, url}=useContext(StoreContext);


const [data,setData]=useState({
  firstname:"",
  lastname:"",
  email:"",
  street:"",
  city:"",
  state:"",
  zipcode:"",
  country:"",
  phone:""

})

const navigate = useNavigate();


const onChangeHandler = (event)=>{
  const name = event.target.name;
  const value = event.target.value;

  setData(data=>({
    ...data,
    [name]:value
  }))

}




const place_Order = async (event)=>{

      event.preventDefault(); //taki jab apan button pr click kre to ye page ko reload na kre

      let orderItems = [];

      food_list.map((item)=>{
        if(cartItems[item._id]>0)
        {
          let itemInfo = {
            ...item,
            quantity: cartItems[item._id]
          };
        
          orderItems.push(itemInfo);
        }

      })

      // console.log(orderItems);

      let orderData = {
        address:data,
        items:orderItems,
        amount:getTotalCartAmount()+50,
      }
    
         console.log("salman khan->")
      let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})

      console.log("Place order ka response->",response);


      //ye check kr rha hai ki payment session successfully create hua hai ya nhi
      if(response.data.success){
        const {session_url} = response.data;

        //session_url is the Stripe checkout page link

        window.location.replace(session_url);//isse payment wala page open hota hai
      }
      else{
        alert("Error aa rhi hai")
      }

}



useEffect(()=>{
  if(!token){
    navigate('/cart')
  }
  else if(getTotalCartAmount()===0)
  {
    navigate('/cart')
  }

},[token])

  return (
    <form onSubmit={place_Order} className="place-order">
      <div className="place-order-left">
        <p className="title">Delievery Information</p>
        <div className="multi-fields">
          <input required name='firstname' onChange={onChangeHandler} value={data.firstname} type="text"  placeholder='First name'/>
          <input required name='lastname' onChange={onChangeHandler} value={data.lastname} type="text" placeholder='Last name' />
        </div>
        <input required  name='email' onChange={onChangeHandler} value={data.email} type="email"placeholder='Email address' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text"  placeholder='City'/>
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text"  placeholder='Zip code'/>
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone'/>
      </div>
      

      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p><span className="rupee">₹</span>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p><span className="rupee">₹</span>{getTotalCartAmount()===0?0:50}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b><span className="rupee">₹</span>{getTotalCartAmount()===0?0:getTotalCartAmount()+50}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO Payment</button>
        </div>

      </div>
    </form>
  )
}

export default placeorder