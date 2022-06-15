
import {collection,deleteDoc , doc ,getDocs,orderBy,query,setDoc } from 'firebase/firestore';
import {getAuth,signInWithEmailAndPassword,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';
import {firestore} from '../firebase';



//saving new item

export const saveItems=async (data)=>{
    await setDoc(doc(firestore,"foodItems",`${Date.now()}`), data,
    {merge:true});
}


export const getAllFoodItems= async()=>{
    const items=await  getDocs(query(collection(firestore,"foodItems"),orderBy('id','desc')));
    return items.docs.map((doc)=>doc.data());
}


export const addItemToCart=async(item,user)=>{
    let count=item.count?item.count+1:1;
    let time=Date.now();
    let cartItem={...item,count,time};
    await setDoc(doc(firestore,`cart@${user.email}`,`${item.id}`), cartItem,
    {merge:true});
}

export const decreaseItemCount=async(item,user)=>{
    let count=item.count-1;
    if(count===0){
        await deleteDoc(doc(firestore, `cart@${user.email}`, item.id));
    }else{
        let cartItem={...item,count};
        await setDoc(doc(firestore,`cart@${user.email}`,`${item.id}`), cartItem,
        {merge:true});
    }
}

export const increaseItemCount=async(item,user)=>{
    let count=item.count+1
    let cartItem={...item,count};
    await setDoc(doc(firestore,`cart@${user.email}`,`${item.id}`), cartItem,
    {merge:true});
}


export const signUp=async(name,email,password)=>{
    
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
        displayName: name, photoURL: "/images/avatar.png"
      })
    return auth.currentUser.providerData[0];
    
}

export const signIn=async (email,password)=>{
    const auth = getAuth();
    const userCredential =await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user.providerData[0];
}