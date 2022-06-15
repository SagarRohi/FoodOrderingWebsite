import React,{useRef,useState} from 'react'
import {motion} from 'framer-motion';
import {MdOutlineKeyboardBackspace} from 'react-icons/md';
import {signUp,} from '../utils/firebaseFunctions';
import {useDispatch, useSelector} from 'react-redux';
import { setUser,setsignUpShow,toggle, setsignInShow } from '../reducer';
import { Provider ,auth,signInWithPopup} from '../firebase';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ThreeDots } from  'react-loader-spinner'
const SignIn = () => {
    const dispatch=useDispatch();
    const usernameRef=useRef();
    const emailRef=useRef();
    const passRef=useRef();
    const [loading,setLoading]=useState(false);
    const signInShow=useSelector((state)=>state.signInShow);
    const handleSignUp=async()=>{
        let name=usernameRef.current.value;
        let Email=emailRef.current.value;
        let password=passRef.current.value;
        if(!name||!Email||!password) return;
        setLoading(true);
        let user=await signUp(name,Email,password);
        dispatch(setUser(user));
        dispatch(setsignUpShow(false));
        setLoading(false);
    }
    const signInWithGoogle=async()=>{
        const {user:{providerData}}=await signInWithPopup(auth,Provider);
        dispatch(setUser(providerData[0]));
        localStorage.setItem('user',JSON.stringify(providerData[0]));
        if(signInShow) dispatch(setsignInShow(false));
        else dispatch(setsignUpShow(false));
    }
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
           <motion.div onClick={()=>dispatch(setsignUpShow(false))}  whileTap={{scale:0.75}}>
           <MdOutlineKeyboardBackspace className='text-textColor
            text-3xl'/>
           </motion.div>
            <p className='text-textColor text-lg
            font-semibold'>Sign Up</p>
            <motion.p whileTap={{scale:0.75}} className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100
            rounded-md hover:shadow-md 
            cursor-pointer text-textColor text-base'>
                </motion.p>
        </div>
        <div className='w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col items-center justify-center gap-4 '>
        
        <div className="relative w-[90%]">
            <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-lg
             text-white bg-cartBg rounded-lg border-2 border-orange-500  
                outline:none  peer" placeholder=" " ref={usernameRef}/>
           <label htmlFor="floating_outlined" className="absolute text-lg text-white 
            duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] 
           bg-cartBg  px-2 peer-focus:px-2 peer-focus:text-orange-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
           peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Username</label>
        </div>

        <div className="relative w-[90%]">
            <input type="email" id="floating_email" className="block px-2.5 pb-2.5 pt-4 w-full text-lg
             text-white bg-cartBg rounded-lg border-2 border-orange-500  
                outline:none  peer" placeholder=" " ref={emailRef} />
           <label htmlFor="floating_email" className="absolute text-lg text-white 
            duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] 
           bg-cartBg  px-2 peer-focus:px-2 peer-focus:text-orange-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
           peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Email</label>
        </div>

        <div className="relative w-[90%]">
            <input type="password" id="floating_pass" className="block px-2.5 pb-2.5 pt-4 w-full text-lg
             text-white bg-cartBg rounded-lg border-2 border-orange-500  
                outline:none  peer" placeholder=" " ref={passRef} />
           <label htmlFor="floating_pass" className="absolute text-lg text-white 
            duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] 
           bg-cartBg  px-2 peer-focus:px-2 peer-focus:text-orange-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
           peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Password</label>
        </div>
   
         <motion.button onClick={handleSignUp} whileTap={{scale:0.90}} className='hover:bg-orange-500 w-[90%] px-8 py-2 text-lg 
         bg-orange-600 text-white rounded-full flex justify-center'>{loading?<ThreeDots color="#00000" height={20} width={50}  />:"Sign Up"}</motion.button>

         <div className='mt-4 w-full flex items-center justify-center'>
         <div className='flex text-sm font-thin items-center gap-2 text-white'>
            <p>Sign In With</p>
            <motion.img onClick={signInWithGoogle} whileTap={{scale:0.75}} src="/images/google.jpg" className='cursor-pointer w-8 h-8 rounded-full' alt='google'/>
           </div>
          <div className='mx-2 h-full w-0 border-l-2 border-white'></div>
          <motion.div whileTap={{scale:0.90}} onClick={()=>dispatch(toggle())}
          className='text-white text-sm font-extralight cursor-pointer hover:text-orange-500'>Sign In</motion.div>
         </div>
        </div>

    </motion.div>
  )
}

export default SignIn