import React,{useState,useEffect} from 'react'
import {IoFastFood} from 'react-icons/io5';
import { categories } from '../data';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import RowContainer from './RowContainer';
const MenuContainer = () => {
    const  [filter,setFilter]=useState("Chicken");
    const foodItems=useSelector((state)=>state.foodItems);
  return (
    <section className='w-full ' id="menu">
        <div className='w-full flex flex-col  items-center justify-center'>
            <p className='text-2xl font-semibold capitalize text-headingColor
            relative before:absolute before:rounded-lg before:content
            before:w-24 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-br
            from-orange-400 to-orange-600 transition-all ease-out duration-100 mr-auto'>
                Our Hot Dishes
            </p>
            <div className='w-full bg-gray-200 mt-8 flex items-center justify-start
            lg:justify-center gap-8 py-8 px-2 overflow-x-scroll'>
              {categories&&categories.map((category,id)=>{
                return   <motion.div key={id} whileTap={{scale:0.75}} onClick={()=>setFilter(category.urlParamName)} className={`group ${filter===category.urlParamName? 'bg-cartNumBg':'bg-card'}  w-24 min-w-[94px]
                h-28 cursor-pointer rounded-lg drop-shadow-xl  shadow-md shadow-zinc-400 flex flex-col
                gap-3 items-center justify-center hover:bg-cartNumBg`}>
                    <div className={`w-10 h-10 rounded-full ${filter===category.urlParamName?'bg-card':'bg-cartNumBg'} 
                    group-hover:bg-card flex items-center 
                    justify-center`}>
                          <IoFastFood className={` ${filter===category.urlParamName?'text-textColor':'text-card'}  group-hover:text-textColor text-lg`}/>
                     </div>
                     <p className={`text-sm font-light ${filter===category.urlParamName?'text-white':'text-textColor'}  group-hover:text-white`}>{category.urlParamName}</p>
                </motion.div>
              })}
            </div>
            <div className='w-full'>
                 <RowContainer flag={false} data={foodItems?.filter((item)=>item.category===filter)}/>
            </div>
        </div>
        </section>
  )
}

export default MenuContainer