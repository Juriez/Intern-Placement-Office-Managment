import { axios } from "../utils/axios";

const showCompany = async () => {
  try {
    const res = await axios.get('/companies',{
      withCredentials: true,
    });
    console.log('Found company lists', res.data);
    return res;
  } catch (error) {
    console.error('error in getting Company list', error);
    throw error;
  }
};


const getStudentBYID=async (id)=>{
  try{
    const res = await axios.get(`/students/${id}`);
    return res;

  }catch(err){
    console.error(err);
  }
}

const cvUpload = async (data,id)=>{
  try{
    const res = await axios.post(`students/${id}/cv`,data,{withCredentials:true});
    console.log(res,"cv upload api");

  }catch(err){
    console.error(err);
  }
}

const skillSetUpload = async (data,id)=>{
  try{
    const res = await axios.put(`students/${id}`,data,{withCredentials:true});

  }catch(err){


  }
}

export {showCompany,getStudentBYID,cvUpload,skillSetUpload} ;