import React,{useRef,useState,useEffect} from 'react'
import HomeContainer from './HomeContainer';
import { motion } from 'framer-motion';
import {MdChevronLeft,MdChevronRight} from 'react-icons/md';
import RowContainer from './RowContainer';
import {useSelector} from 'react-redux';
import MenuContainer from './MenuContainer';
import { categories } from '../data';
import CartContainer from './CartContainer';
import SignIn from './SignIn';
import SignUp from './SignUp';

const MainContainer = () => {
  const foodItems=useSelector((state)=>state.foodItems);
  const cartShow=useSelector((state)=>state.cartShow);
  const signInShow=useSelector((state)=>state.signInShow);
  const signUpShow=useSelector((state)=>state.signUpShow);
  const [index,setIndex]=useState(1);
  useEffect(()=>{
    const id=setInterval(()=>{
       setIndex(index=>(index==categories.length-1?1:(index+1)));
    },[60000]);
    return ()=> clearInterval(id);
  },[])
  const rowContainerRef=useRef();
  const scrollValue=600;
  const leftScroll=()=>{
    rowContainerRef.current.scrollLeft-=scrollValue;
  }
  const rightScroll=()=>{
    rowContainerRef.current.scrollLeft+=scrollValue;
  }
  const cat=categories[index];
  return (
    <div className='w-full flex flex-col items-center justify-center '>
      <HomeContainer/>
      <section className='w-full mt-4 md:mt-0'>
        <div className='w-full flex  items-center justify-between'>
          <p className='text-2xl font-semibold text-headingColor
           capitalize relative before:absolute before:rounded-lg
            before:w-32 
           before:h-1 before:-bottom-2 before:left-0 
           before:bg-gradient-to-r from-orange-400 to-orange-600
           transition-all duration-100 ease-in-out'>
             {cat?.desc}
          </p>
          <div className='hidden md:flex gap-3 items-center'>
            <motion.div onClick={leftScroll} whileTap={{scale:0.75}} className='w-8 h-8 rounded-lg bg-orange-300 flex 
            items-center justify-center hover:bg-orange-500 duration-100
            ease-in-out transition-all hover:shadow-lg'>
               <MdChevronLeft  className='text-lg text-white'/>             
            </motion.div>
            <motion.div onClick={rightScroll} whileTap={{scale:0.75}}  className='w-8 h-8 rounded-lg bg-orange-300 flex 
            items-center justify-center hover:bg-orange-500 duration-100
            ease-in-out transition-all hover:shadow-lg'>
               <MdChevronRight  className='text-lg text-white'/>
            </motion.div>
          </div>
        </div>
        <RowContainer flag={true} data={foodItems?.filter((item)=>item.category===cat?.name)} rowContainerRef={rowContainerRef}/>
      </section>
      <MenuContainer/>
      {cartShow&&<CartContainer/>}
      {signInShow&&<SignIn/>}
      {signUpShow&&<SignUp/>}
    </div>
  ) 
}

export default MainContainer