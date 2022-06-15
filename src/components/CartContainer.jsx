import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import {RiRefreshFill} from 'react-icons/ri';
import {MdOutlineKeyboardBackspace} from 'react-icons/md';
import { useSelector,useDispatch } from 'react-redux/es/exports';
import { setCartShow} from '../reducer';
import CartItem from './CartItem';
import { firestore } from '../firebase';
import { collection, onSnapshot, orderBy, query} from 'firebase/firestore';
const CartContainer = () => {
    const dispatch=useDispatch();
    const cartShow=useSelector((state)=>state.cartShow);
    const user=useSelector((state)=>state.user);
    const [cartItems,setCartItems]=useState([]);
    const [subTotal,setSubTotal]=useState(0);
    const fetchCartData= ()=>{
      const q = query(collection(firestore, `cart@${user.email}`),orderBy('time','desc'));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      let totalPrice=0;
      querySnapshot.forEach((doc) => {
          let item=doc.data();
          items.push(item);
          totalPrice=totalPrice+item.count*item.price;
      });
      setCartItems(items);
      setSubTotal(totalPrice);
    });
    return  unsubscribe;
  }
  useEffect(()=>{
    if(user){
       return fetchCartData();
    }else setCartItems([]);
  },[user])

  return (
    <motion.div 
    initial={{opacity:0,x:200}}
    animate={{opacity:1,x:0}}
    exit={{opacity:0,x:200}}
    className='fixed top-0 right-0 w-full 
    md:w-375 h-screen bg-white drop-shadow-md flex
    flex-col z-[101]'>
        <div className='w-full flex items-center justify-between
       p-4'>
           <motion.div onClick={()=>dispatch(setCartShow(!cartShow)) }   whileTap={{scale:0.75}}>
           <MdOutlineKeyboardBackspace className='text-textColor
            text-3xl'/>
           </motion.div>
            <p className='text-textColor text-lg
            font-semibold'>Cart</p>
            <motion.p whileTap={{scale:0.75}} className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100
            rounded-md hover:shadow-md 
            cursor-pointer text-textColor text-base'>
                Clear<RiRefreshFill/>
                </motion.p>
        </div>

        <div className='w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col'>
            {/* cart Items section */}
            <div className='w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3
            overflow-y-scroll'>
                {/* cart Item */}
                {cartItems&&cartItems.length>0?(cartItems.map((item)=>{
                    return<CartItem item={item} key={item.id}/>
                })):(
                    <div className='w-full h-full bg-cartBg rounded-t-[2rem]
                    flex flex-col'>
                        <img src="/images/emptyCart.svg" className='w-300' alt=''/>
                        <p className='text-xl text-textColor font-semibold'>
                            Add some items to your cart
                        </p>
                    </div>
                )}
            </div>
            {/* cart total section */}
            <div className='w-full flex-1 bg-cartTotal rounded-t-[2rem]
            flex flex-col items-center justify-evenly px-8 py-2'>
                <div className='w-full flex items-center justify-between'>
                    <p className='text-gray-400 text-lg'>Sub Total</p>
                    <p className='text-gray-400 text-lg'>${subTotal}</p>
                </div>
                <div className='w-full flex items-center justify-between'>
                    <p className='text-gray-400 text-lg'>Delivery</p>
                    <p className='text-gray-400 text-lg'>${subTotal>0?1.5:0}</p>
                </div>
                <div className='w-full border-b border-gray-600 my-2'></div>
                <div className='w-full flex items-center justify-between'>
                    <p className='text-gray-200 text-xl font-semibold'>Total</p>
                    <p className='text-gray-200 text-xl font-semibold'>${subTotal>0?subTotal+1.5:0}</p>
                </div>
                <motion.button
                whileTap={{scale:0.8}}
                type='button'
                className='w-full p-2 rounded-full
                bg-gradient-to-tr from-orange-400 to-orange-600
                text-gray-50 text-lg my-2 hover:shadow-lg'>
                   Check Out
                </motion.button>
            </div>
        </div>
    </motion.div>
  )
}

export default CartContainer