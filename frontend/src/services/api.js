import axios from "axios";

const API_URL="http://localhost:5000";

export const login= async (email,password,role,secretKey)=>{
    try{ 
        const data={email,password,role,secretKey};
        const response= await axios.post(`${API_URL}/login`,data,{withCredentials:true});
        return response.data;
    }
    catch(error){
        console.log("error: ",error);
    }
}

export const signup= async (name,phone,email,password,role,secretKey)=>{
    try{ 
        console.log("herer also role ",role);
        const data={name,phone,email,password,role,secretKey};
        const response= await axios.post(`${API_URL}/signup`,data,{withCredentials:true});
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        return response.data;
    }
    catch(error){
        console.log("error: ",error);
    }
}

export const logged= async (token)=>{
    try{ 
        
        const response= await axios.post(`${API_URL}/logged`,{token},{withCredentials:true});
        console.log("recieved response"+JSON.stringify(response));
        return response.data.message;
    }
    catch(error){
        console.log("error: ",error);
    }
}

export const addQuestion= async (newQuestion)=>{
    try{ 
        
        const response= await axios.post(`${API_URL}/admin`,newQuestion,{withCredentials:true});
        return response.data;
    }
    catch(error){
        console.log("error: ",error);
    }
}

export const updateQuestion= async (editQuestion)=>{
    console.log("handleupdate reached api");
    try{ 
        
        const response= await axios.patch(`${API_URL}/update_admin`,editQuestion,{withCredentials:true});
        return response.data;
    }
    catch(error){
        console.log("error: ",error);
    }
}


export const getQuestion = async (questionId = '') => {
    try {
      const url = questionId ? `${API_URL}/fetch_admin/${questionId}` : `${API_URL}/fetch_admin`;
      const response = await axios.get(url, { withCredentials: true });
      console.log("abhi joh mila hain "+response.data);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      throw error; 
    }
};

export const deleteQuestion= async (_id)=>{
    try{ 
        const response = await axios.delete(`${API_URL}/delete_admin/${_id}`, { withCredentials: true });
        //const response= await axios.delete(`${API_URL}/delete_admin`,_id,{withCredentials:true});
        return response.data;
    }
    catch(error){
        console.log("error: ",error);
      
    }
}

export const logout= async ()=>{
    try{ 
        const response = await axios.get(`${API_URL}/logout`, { withCredentials: true });
       
        return response.data;
    }
    catch(error){
        console.log("error: ",error);
      
    }
}


export const compile= async (language,code,input)=>{
    try{ 
        const data={language,code,input};
        const response = await axios.post(`${API_URL}/compile`,data, { withCredentials: true });
     
        return response.data.output;
    }
    catch(error){
        console.log("error: ",error);
      
    }
}

export const uploadTestCase= async ( _id, input, expectedOutput)=>{
    try{ 
      
        const data={_id ,input ,expectedOutput};
        const response= await axios.post(`${API_URL}/uploadTestCase`,data,{withCredentials:true});
        return response.data;
    }
    catch(error){
        console.log("error: ",error);
    }
}

export const getTestcases= async (questionId)=>{
    try{ 
        console.log("reached testcases api "+questionId);
        const response = await axios.get(`${API_URL}/getTestcases`, {
            params: {
                questionId: questionId
            },
            withCredentials: true
        });
        return response.data;
    }
    catch(error){
        console.log("error: ",error);
    }
}