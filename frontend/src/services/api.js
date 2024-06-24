import axios from "axios";

const API_URL=" http://localhost:3000";

export const login= async (email,password)=>{
    try{ 
        const data={email,password};
        const response= await axios.post(`${API_URL}/login`,data);
        return response.data;
    }
    catch(error){
        console.log("error: ",error);
    }
}

export const signup= async (name,phone,email,password)=>{
    try{ 
        const data={name,phone,email,password};
        const response= await axios.post(`${API_URL}/signup`,data);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        return response.data;
    }
    catch(error){
        console.log("error: ",error);
    }
}