import React from 'react'
import {BiMinus,BiPlus} from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux/es/exports';
import { increaseItemCount,decreaseItemCount } from '../utils/firebaseFunctions';
const CartItem = ({item}) => {
 
   const user=useSelector((state)=>state.user);
   
 
  const update=(action)=>{
    if(action==='add'){
      increaseItemCount(item,user);
    }else{
      decreaseItemCount(item,user);
    }
  }

  return (
    <div className='w-full p-1 px-2 rounded-lg
    bg-cartItem flex items-center gap-2'>
         <img src={item.imageURL} alt="cartitem" 
         className='w-20 h-20 max-w-[640px] rounded-full object-contain'/>
        
       {/* name section*/}
         <div className='flex flex-col gap-2'>
            <p className='text-base text-gray-50'>
                {item.title}
            </p>
            <p className='text-sm block text-gray-300
             font-semibold'>${item.price}</p>
         </div>


       {/* bottom section */}
         <div className='group flex items-center gap-2
         ml-auto cursor-pointer'>
            <motion.div onClick={()=>update('minus')} whileTap={{scale:0.75}}>
                <BiMinus className='text-gray-50'/>
            </motion.div>
                <p className='w-5 h-5 rounded-sm
                bg-cartBg text-gray-50 flex items-center
                justify-center'>
                   {item.count}
                </p>
            <motion.div onClick={()=>update('add')} whileTap={{scale:0.75}}>
            <BiPlus  className='text-gray-50'/>
            </motion.div>
         </div>
    </div>
  )
}

export default CartItem;