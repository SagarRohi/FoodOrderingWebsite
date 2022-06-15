import React from 'react'
import {data} from '../data';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setCartShow } from '../reducer';
const HomeContainer = () => {
  const dispatch=useDispatch();
  return (
    <section className='grid grid-cols-1 lg:grid-cols-2 gap-2 w-full'>
      <div className='py-2 flex-1  flex flex-col items-start   gap-4 '>
        <div className='flex gap-2 px-4 py-1 items-center justify-center bg-orange-100 rounded-full'>
          <p className='text-orange-500 font-semibold text-base'>
             Bike Delivery
          </p>
          <div className='w-8 h-8 rounded-full overflow-hidden bg-white drop-shadow-xl'>
             <img src='./images/delivery.png' className='w-full h-full object-contain' alt='bike'/>
          </div>
        </div>
        <p className='leading-tight	 text-[2.5rem] md:text-[4rem] font-bold  tracking-wide text-headingColor'>
          The Fastest Delivery in <span className='text-orange-600 text-[3rem] md:text-[4.5rem]'>Your City</span>
        </p>
        <p className='text-base text-textColor text-center md:text-left md:w-[80%] lg:text-md mb-2'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio distinctio ipsum ratione
           similique. Reprehenderit neque nemo amet placeat
            officiis soluta error dolore ex quasi fugit, vitae beatae blanditiis natus minima.
        </p>
        <motion.button whileTap={{scale:0.75}}
        onClick={()=>dispatch(setCartShow(true))} type='button' className='bg-gradient-to-br from-orange-400 to-orange-500 w-full px-4 py-2 rounded-lg hover:shadow-lg
        transition-all duration-100 ease-in-out md:w-auto'>Order Now</motion.button>
      </div>
      <div className='py-2 flex-1 flex relative'>
            <img src='./images/herobg.png' className= ' ml-auto h-370 w-full lg:w-auto lg:h-650' alt='bg'/>

            <div className='w-full h-full absolute lg:-top-3 left-0 flex justify-center lg:justify-start  items-center  flex-wrap content-center px-2 md:px-28 md:gap-24 lg:px-[16%] py-12 lg:gap-y-20 gap-y-16 gap-2 lg:gap-4 '>
              {data&&data.map((item)=>{
                return <motion.div  
                initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                transition={{ duration: 2 }} key={item.id} className='w-150 lg:w-190 p-2 lg:p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col
                items-center justify-center gap-2 drop-shadow-xl'>
                  <img src={item.imgSrc} className='w-20 lg:w-40 -mt-12 lg:-mt-20 drop-shadow-xl ' alt='1'/>
                  <p className='text-base lg:text-xl font-semibold text-textColor -mt-2'>{item.name}</p>
                  <p className=' text-xs lg:text-sm text-lighttextGray font-semibold '>{item.desc}</p>
                  <p className='text-sm font-semibold text-headingColor flex items-center gap-1'>
                    <span className='text-xs text-red-600'>$ </span>{item.price}
                  </p>
                </motion.div>
              })}
            </div>
      </div>
    </section >
  )
}

export default HomeContainer