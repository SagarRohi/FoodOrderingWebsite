import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import {CreateContainer, Header, MainContainer} from './components';
import { getAllFoodItems } from './utils/firebaseFunctions';
import { useDispatch } from 'react-redux';
import { setFoodItems} from './reducer';
import { useEffect } from 'react';
const App=()=>{
   const dispatch=useDispatch();
   const fetchData=async ()=>{
       const data=await  getAllFoodItems();
       dispatch(setFoodItems(data));
   }
   useEffect(()=>{
       fetchData();
   },[])
  return <AnimatePresence exitBeforeEnter >
    <div className='w-screen scrollbar-hide h-auto flex flex-col'>
    <Header/>
    <div className='mt-14 md:mt-20  py-4 w-screen scrollbar-hide  px-4 md:px-16'>
        <Routes>
          <Route path='/' element={<MainContainer/>}/>
          <Route path='/create' element={<CreateContainer/>}/>
        </Routes>
    </div>
  </div>
  </AnimatePresence>
}

export default App;