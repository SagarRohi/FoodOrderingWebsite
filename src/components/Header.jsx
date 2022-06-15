import React, { useEffect, useState } from 'react'
import { BsBagFill } from "react-icons/bs";
import { MdAdd,MdLogout } from "react-icons/md";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Provider ,auth,signInWithPopup, firestore} from '../firebase';
import { useDispatch,useSelector } from 'react-redux';
import {setsignInShow, setUser} from '../reducer';
import { REACT_APP_ADMIN } from '../config';
import { signOut } from 'firebase/auth';
import { setCartShow } from '../reducer';
import { collection, onSnapshot, query} from 'firebase/firestore';
import {useNavigate} from 'react-router-dom';
const Header = () => {
  const navigate=useNavigate();
  const cartShow=useSelector((state)=>state.cartShow);
  const [totalCartItems,setTotalCartItems]=useState(0);
  const dispatch=useDispatch();
  const [showMenu,setShowMenu] =useState(false);
  const user=useSelector(state=>state.user);
  const login=async()=>{
    if(user) {
       setShowMenu(!showMenu);
       return;
     }else dispatch(setsignInShow(true));
  }
  
  const fetchCartData= ()=>{
    const q = query(collection(firestore, `cart@${user.email}`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
          items.push(doc.data().name);
      });
      setTotalCartItems(items.length);
    });
    return  unsubscribe;
  }

  useEffect(()=>{
      if(user){
         return fetchCartData();
      }else setTotalCartItems(0);
  },[user])

  const logOut=()=>{
    localStorage.removeItem('user');
    signOut(auth);
    dispatch(setUser(null));
    navigate("/");
  }
  return (
    <div className='fixed z-50 w-screen scrollbar-hide p-3 px-4  md:px-16 md:p-4 bg-primary drop-shadow-lg'>
      {/* desktop /tablet*/}
      <div className='w-full h-full hidden md:flex items-center justify-between'>
        <Link to={"/"} className='flex items-center gap-2'>
           <img src='/images/logo.png' alt='hero' className='w-8'/>
           <p className='text-headingColor text-xl font-bold'>Fruity</p>
        </Link>
        <div className='flex items-center gap-8'>
          <motion.ul
          initial={{opacity:0,x:200}} 
          animate={{opacity:1,x:0}} 
          exit={{opacity:0,x:200}} 
          className='flex items-center ml-auto gap-8'>
            <li className='cursor-pointer text-textColor hover:text-purple-700 duration-100 transition-all ease-in-out text-base'>Home</li>
            <li className='cursor-pointer text-textColor hover:text-purple-700 duration-100 transition-all ease-in-out text-base'>Menu</li>
            <li className='cursor-pointer text-textColor hover:text-purple-700 duration-100 transition-all ease-in-out text-base'>Services</li>
          <li className='cursor-pointer text-textColor hover:text-purple-700 duration-100 transition-all ease-in-out text-base'>About Us</li>
          </motion.ul>
          <div onClick={()=>{
            if(user){
              dispatch(setCartShow(!cartShow))
            }else dispatch(setsignInShow(true));
          }} 
          className='relative flex justify-center items-center cursor-pointer'>
            <BsBagFill className='text-xl text-textColor'/>
          {user&&<p className='w-5 h-5 rounded-full bg-cartNumBg text-white text-xs flex justify-center items-center
            absolute -top-4 -right-3 '>{totalCartItems}</p>}
         </div>

         <div className='relative'>
         <motion.img whileTap={{scale:0.6}} src={user?user.photoURL:'/images/avatar1.png'} alt='avatar' className='w-9 cursor-pointer 
         drop-shadow-sm shadow-md shadow-gray-400 rounded-full object-contain' onClick={login}/>
         {showMenu&&<motion.div  
         initial={{opacity:0,scale:0.2}}
         animate={{opacity:1,scale:1}}
         exit={{opacity:0,scale:0.6}}
         onClick={()=>setShowMenu(false)}
         className='absolute bg-gray-100 border-2 
         shadow-xl space-y-2 text-sm w-40 rounded-lg px-4 py-2 top-10 right-0'>
          { REACT_APP_ADMIN===user?.email&& <Link to={'/create'} className='cursor-pointer flex p-2 hover:text-purple-700
            duration-100 transition-all ease-in-out '> Add Item <MdAdd className='ml-auto text-textColor text-xl'/></Link>}
           <p onClick={logOut} className='cursor-pointer flex p-2 hover:text-purple-700 duration-100 
            transition-all ease-in-out'>LogOut <MdLogout className='ml-auto bg-white text-textColor text-xl'/></p>
         </motion.div>}
         </div>
        </div>
      </div>
      {/*  Mobile view */}
      
      <div className='w-full h-full flex md:hidden items-center justify-between '>

       <div onClick={()=>{
        if(user){
          dispatch(setCartShow(!cartShow))
        }else dispatch(setsignInShow(true));
       }} 
       className='relative flex justify-center items-center cursor-pointer'>
            <BsBagFill className='text-xl text-textColor'/>
          <p className='w-5 h-5 rounded-full bg-cartNumBg text-white text-xs flex justify-center items-center
            absolute -top-4 -right-3 '>{totalCartItems}</p>
         </div>

        <Link to={"/"} className='flex items-center gap-2'>
           <img src='/images/logo.png' alt='hero' className='w-8'/>
           <p className='text-headingColor text-xl font-bold'>Fruity</p>
        </Link>

        <div className='relative'>
         <motion.img whileTap={{scale:0.6}} src={user?user.photoURL:'/images/avatar.png'} alt='avatar' className='w-8 cursor-pointer 
         drop-shadow-sm shadow-md shadow-gray-400 rounded-full' onClick={login}/>
         {showMenu&&<motion.div 
         initial={{opacity:0,scale:0.2}}
         animate={{opacity:1,scale:1}}
         exit={{opacity:0,scale:0.6}}
         onClick={()=>setShowMenu(false)}
         className='absolute bg-gray-100  shadow-gray-400 
         shadow-lg space-y-2 text-sm w-40 rounded-lg border-2 border-gray-200  top-10 right-0'>
          { REACT_APP_ADMIN===user?.email&& <Link to={'/create'} className='cursor-pointer flex p-2 pb-0 hover:text-purple-700
            duration-100 transition-all ease-in-out '> Add Item <MdAdd className='ml-auto text-textColor text-xl'/></Link>}
          <ul
          className='flex flex-col '>
            <li className='cursor-pointer p-2 text-textColor hover:text-purple-700 duration-100 transition-all ease-in-out text-base'>Home</li>
            <li className='cursor-pointer p-2  text-textColor hover:text-purple-700 duration-100 transition-all ease-in-out text-base'>Menu</li>
            <li className='cursor-pointer p-2 text-textColor hover:text-purple-700 duration-100 transition-all ease-in-out text-base'>Services</li>
            <li className='cursor-pointer p-2 text-textColor hover:text-purple-700 duration-100 transition-all ease-in-out text-base'>About Us</li>
          </ul>

           <p onClick={logOut}
           className='cursor-pointer flex  bg-slate-200 gap-4 hover:bg-slate-300 md:bg-white justify-center md:justify-start shadow-lg  p-2  hover:text-purple-700 duration-100 
            transition-all ease-in-out rounded-md'>LogOut <MdLogout className='bg-white  text-textColor text-xl'/></p>
         </motion.div>}
         </div>
      </div>
    </div>
  )
}

export default Header