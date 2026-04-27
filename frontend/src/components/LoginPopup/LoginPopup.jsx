import React, { useState  ,useContext } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/storecontext'
import axios from 'axios'
// import toast from 'toastify'


const LoginPopup = ({setShowLogin}) => {

    const [currentState,setCurrentState]=useState("Login")

    const {url,setToken}=useContext(StoreContext);

    const [formData,setFormtData]=useState({
      name:"",
      email:"",
      password:""
    });

    const onChangeHandler = async (event)=>{

      const name=event.target.name;
      const value=event.target.value; //ye direct input field se aa ha hai na ki jo apan input field me value me pass kr rhe hai
     
      setFormtData(prev=>({
        ...prev,
        [name]:value
      }))

    }


    const onLogin = async (event)=>{
      event.preventDefault();

      let newUrl=url;

      if(currentState==="Login"){
        newUrl+="/api/user/login"
      }else
      {
        newUrl+="/api/user/register"
      }

     const response = await  axios.post(newUrl,formData);

     console.log("Responnse->",response);
     

     if(response.data.success)
     {
      console.log("lo me aa gya");
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token) //yha apan token ko local storage me store kr rhe hai
      setShowLogin(false);

     }
     else{
      alert(response.data.message);
     }


    }



  return (
    <div className='login-popup'>

    <form onSubmit={onLogin} action="" className="login-popup-container">

    <div className="login-popup-title">
        <h2>{currentState}</h2>
        <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
    </div>

   
    {/* //value={formData.name} value={formData.email} value={formData.password}  inhe pass krne ki koi jarurat nhi hai */}
    <div className="login-popup-input">  
    {currentState==="Login"?<></>:  <input name='name' onChange={onChangeHandler} value={formData.name} type="text" placeholder='Your Name' required />}
      
        <input name='email' onChange={onChangeHandler} value={formData.email} type="email" placeholder='Your Email' required />
        <input name='password' onChange={onChangeHandler} value={formData.password} type="password" placeholder='Password' required />
    </div>

    <button type='submit'>{currentState==="Sign Up"?"Create Account" :"Login"}</button>

    <div className="login-popup-condition">
        <input type="checkbox" required />
        <p>By continuing, i agree to the terms of use & privacy policy.</p>
    </div>

    {currentState==="Login"?   <p>Create a new account? <span onClick={()=>setCurrentState("Sign Up")}>Click Here</span></p>
    :<p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login here</span></p>
    }
  
    


    </form>
    
    </div>
  )
}

export default LoginPopup