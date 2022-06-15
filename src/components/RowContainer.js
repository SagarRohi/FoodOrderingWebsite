import React from 'react'
import { motion } from 'framer-motion';
import {  BsBagFill } from "react-icons/bs";
import { useSelector,useDispatch} from 'react-redux';
import {addItemToCart} from '../utils/firebaseFunctions';
import { setsignInShow } from '../reducer';
const RowContainer = ({flag,data,rowContainerRef}) => {
  const dispatch=useDispatch();
  const user=useSelector((state)=>state.user);
  const addToCart=(item)=>{
    if(user){
      addItemToCart(item,user);  
    }else dispatch(setsignInShow(true));
  }
  return (
    <div ref={rowContainerRef} className={`w-full my-4 flex scroll-smooth items-center gap-4 bg-cardOverlay ${flag?'overflow-x-scroll':'overflow-x-hidden flex-wrap justify-center gap-x-4 '}`}>
      {data&&data.map((item)=>{
        return <div key={item.id} className='w-300 h-48 min-w-[300px] md:w-340 md:min-w-[340px]  my-12
        bg-gray-200 hover:bg-gray-300 rounded-lg p-2 hover:drop-shadow-lg flex'>
          <div className='flex-1 h-56  hover:drop-shadow-2xl '>
              <motion.img
              whileHover={{scale:1.2}} 
              src={item.imageURL} alt='ice'
              className='w-full h-full max-h-44 object-contain -mt-10 cursor-pointer drop-shadow-xl '/>
          </div>
          <div className="w-auto flex flex-col items-end justify-around">
          <motion.div
              onClick={()=>{
                 addToCart(item);
              }}
              whileTap={{scale:0.75}}
              className='w-8 h-8 rounded-full bg-red-600 flex items-center
              justify-center cursor-pointer drop-shadow-2xl '>
                  <BsBagFill className='text-white drop-shadow-xl'/>
              </motion.div>
              <div>
              <p className="text-textColor font-semibold text-base md:text-lg w-max">
                 {item.title}
              </p>
              <p className='mt-1 text-sm text-gray-500'>{item.calories} calories</p>
              <div className='flex items-center gap-8'>
                  <p className='text-lg font-semibold text-headingColor'>
                      <span className='text-sm text-red-500'>$</span>{item.price}</p>
              </div>
              </div>
          </div>
        </div>
      })}
    </div>
  )
}

export default RowContainer