import React from 'react'
import './exploremenu.css'
import { menu_list } from '../../assets/assets'

const exploremenu = ({category,setCategory}) => {
  return (
    <div className='exploremenu' id='exploremenu'>
    <h1>Explore our menu</h1>
    <p className='exploremenu-text'>Choose from a diverse menu featuring a delectable array of dished crafted with the finest ingredients and elevate your dining experience,one delicious meal at a time.</p>
    <div className="exploremenu-list">
        {menu_list.map((item,index)=>
             (
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="exploremenu-listitem">
                    <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
        )}
    </div>
    <hr></hr>
    </div>
  )
}

export default exploremenu