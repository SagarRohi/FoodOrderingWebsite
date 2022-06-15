import {createSlice} from '@reduxjs/toolkit';
import {fetechUser} from './utils/locationStorageFunctions';
const userInfo=fetechUser();
const initialState={
    user:userInfo,
    foodItems:null,
    cartShow:false,
    signInShow:false,
    signUpShow:false,
    cartItems:[],
}

const slice=createSlice({
    name:'Auth',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload;
        },
        setFoodItems:(state,action)=>{
            state.foodItems=action.payload;
        },
        addFoodItem:(state,action)=>{
            state.foodItems=[...state.foodItems,action.payload];
        },
        setCartShow:(state,action)=>{
            state.cartShow=action.payload;
        },
        setCartItems:(state,action)=>{
            state.cartItems=action.payload;
        },
        setsignInShow:(state,action)=>{
            state.signInShow=action.payload;
        },
        setsignUpShow:(state,action)=>{
            state.signUpShow=action.payload;
        },
        toggle:(state,action)=>{
            state.signInShow=!state.signInShow;
            state.signUpShow=!state.signUpShow;
        }
    }
});
export const {setUser,setFoodItems,addFoodItem,setCartShow,setCartItems,setsignInShow,setsignUpShow,toggle} = slice.actions;
export default slice.reducer;