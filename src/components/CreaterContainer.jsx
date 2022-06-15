import React from 'react'
import { useState,useRef } from 'react';
import { motion } from 'framer-motion';
import {MdFastfood,MdCloudUpload,MdDelete,MdFoodBank,MdAttachMoney} from 'react-icons/md';
import {categories} from '../data';
import Loader from './Loader';
import {storage} from '../firebase';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {saveItems} from '../utils/firebaseFunctions';
import {useDispatch} from 'react-redux';
import { getAllFoodItems } from '../utils/firebaseFunctions';
import {setFoodItems} from '../reducer';
const CreaterContainer = () => {
  
  const dispatch=useDispatch();
  const titleRef=useRef();
  const colorieRef=useRef();
  const priceRef=useRef();
  const categoryRef=useRef();
  const [fields,setFields]=useState(false);
  const [alertStatus,setAlertStatus]=useState("danger");
  const [message,setMessage]=useState(null);
  const [isLoading,setIsLoading]=useState(false);
  const [imageAsset,setImageAsset]=useState(null);

  const uploadImage=(e)=>{
     setIsLoading(true);
     const imageFile=e.target.files[0];
     const storageRef=ref(storage,`Images/${Date.now()}-${imageFile.name}`);
     const uploadTask=uploadBytesResumable(storageRef,imageFile);
     uploadTask.on('state_changed',(snapshot)=>{
       const uploadProgress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
     },
     (error)=>{
       console.log(error);
       setFields(true);
       setMessage("Error While Uploading :(: Try Again :)");
       setAlertStatus("danger");
       setTimeout(()=>{
        setFields(false);
        setIsLoading(false);
       },4000)
     },
     ()=>{
       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
         setImageAsset(downloadURL);
         setIsLoading(false);
         setFields(true);
         setMessage("Image uploaded Successfully :)");
         setAlertStatus("success");
         setTimeout(()=>{
          setFields(false);
         },4000)
       })
     })
  }
  const deleteImage=()=>{
     setIsLoading(true);
     const deleteRef=ref(storage,imageAsset);
     deleteObject(deleteRef).then(()=>{
       setImageAsset(null);
       setIsLoading(false);
       setFields(true);
       setMessage("Image Deleted Successfully :)");
       setAlertStatus("success");
       setTimeout(()=>{
        setFields(false);
       },4000)
     })
  }
  const saveDetails=async()=>{
      setIsLoading(true);
      try {

        const title=titleRef.current.value;
        const price=priceRef.current.value;
        const category=categoryRef.current.value;
        const calories=colorieRef.current.value;
        if((!title||!price||!category||!calories||!imageAsset)){
          setFields(true);
          setMessage("Required Fields Can't be Empty :(: Try Again :)");
          setAlertStatus("danger");
          setTimeout(()=>{
           setFields(false);
           setIsLoading(false);
          },4000);
        }else{
          const data={
            id:`${Date.now()}`,
            title,price,category,calories,
            imageURL:imageAsset,
          }
          await saveItems(data);
          fetchData();
          setIsLoading(false);
          clearData();
          setFields(true);
          setMessage("Data uploaded Successfully :)");
          setAlertStatus("success");
          setTimeout(()=>{
           setFields(false);
         },4000)
        }
        
      } catch (error) {
        setFields(true);
        setMessage("Error While Uploading :(: Try Again :)");
        setAlertStatus("danger");
        setTimeout(()=>{
         setFields(false);
         setIsLoading(false);
        },4000)
      }
  }

  const clearData=()=>{
    titleRef.current.value="";
    setImageAsset(null);
    priceRef.current.value="";
    colorieRef.current.value="";
  }
   const fetchData=async ()=>{
    const data=await  getAllFoodItems();
   dispatch(setFoodItems(data));
}
  return (
    <div className='w-full flex pt-8  md:pt-4 items-center justify-center'>
      <div className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-2'>
         {fields&&(
           <motion.p 
           initial={{opacity:0}}
           animate={{opacity:1}}
           exit={{opacity:0}}
           className={`w-full p-2 rounded-lg text-center text-lg font-semibold
           ${alertStatus==='danger'?'bg-red-400 text-red-800':'bg-emerald-400 text-emerald-800'}`}>
             {message}
           </motion.p>
         )}
         <div className='w-full py-2 border-b border-gray-300 flex
         items-center gap-2 '>
           <MdFastfood className='text-xl text-gray-700'/>
           <input 
           type="text"
           required
           ref={titleRef}
           placeholder="Give me a title..."
           className='w-full h-full text-lg bg-transparent font-semibold
           outline-none border-none placeholder:text-gray-400
           text-textColor'/>
         </div>

         <div className='w-full'>
           <select ref={categoryRef}  className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer">
             <option value="other" className='bg-white'>Select Category</option>
             {categories&&categories.map((item)=>{
                 return <option key={item.id} className="text-base
                 border-0 outline-none capitalize bg-white text-headingColor"
                 value={item.urlParamName}>
                 {item.name}
                 </option>
             })}
           </select>
         </div>
         <div className='group flex justify-center items-center flex-col
         border-2 border-dotted border-gray-300 w-full h-225 md:h-420
         cursor-pointer rounded-lg'>
          {isLoading?<Loader/>:<>
               {!imageAsset?<>
               <label  className='w-full h-full flex flex-col items-center justify-center 
               cursor-pointer'>
                 <div className='w-full h-full flex flex-col items-center 
                 justify-center gap-2'>
                 <MdCloudUpload className='text-gray-500 text-3xl
                  hover:text-gray-700'/>
                  <p className='text-gray-500 
                  hover:text-gray-700'>Click here to upload</p>
                 </div>
                 <input onChange={uploadImage} 
                 className="w-0 h-0"
                  type='file' name="uploadimage" accept='image/*'/>
               </label >
               </>:<>
               <div className='relative h-full'>
                 <img src={imageAsset} alt="uploaded image"
                  className='w-ful h-full object-cover'/>
                 <button type='button' className='absolute bottom-3
                 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer
                 outline-none hover:shadow-lg duration-500
                 transition-all ease-out'
                 onClick={deleteImage}
                 >
                   <MdDelete className='text-white'/>
                 </button>
               </div>
               </>}
          </>}
         </div>
         <div className='w-full flex flex-col md-flex-row items-center
         gap-3'>
           <div className='w-full py-2 border-b border-gray-300 flex
           items-center gap-2'>
             <MdFoodBank className='text-gray-700 text-2xl ' />
             <input type='text' ref={colorieRef}
             required placeholder='Calories' className="w-full h-full
             text-lg bg-transparent text-textColor outline-none border-none placeholder:text-gray-400"/>
           </div>
           <div className='w-full py-2 border-b border-gray-300 flex
           items-center gap-2'>
             <MdAttachMoney className='text-gray-700 text-2xl ' />
             <input type='text' ref={priceRef}
             required placeholder='Price' className="w-full h-full
             text-lg bg-transparent text-textColor outline-none border-none placeholder:text-gray-400"/>
           </div>
         </div>
         <div className='flex items-center w-full'>
           <button type='button' className='ml-0 md:ml-auto w-full md:w-auto border-none 
           outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-bold ' 
           onClick={saveDetails}>
             Save
           </button>
         </div>
      </div>

    </div>
  )
}

export default CreaterContainer