export const isLoggedIn=() =>{
    let data=localStorage.getItem("token");
    if(data!=null) return true;
    else return false;
}

export const getRole=() =>{
    let data=localStorage.getItem("role");
    if(data!=null) return data;
    else return false;
}