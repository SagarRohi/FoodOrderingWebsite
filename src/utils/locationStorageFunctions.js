

export const fetechUser=()=>{
    if(localStorage.getItem('user')){
      return JSON.parse(localStorage.getItem('user'));
    }else localStorage.clear();
    return null;
}


export const fetchCart = () => {
    const cartInfo =
      localStorage.getItem("cartItems") !== "undefined"
        ? JSON.parse(localStorage.getItem("cartItems"))
        : localStorage.clear();
  
    return cartInfo ? cartInfo : [];
  };