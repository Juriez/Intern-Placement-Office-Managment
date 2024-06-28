import { axios } from "../utils/axios";

const addSuggestedStudent = async (id) => {
  try {
    const res = await axios.post(`/${id}/interviewees`, { id }, {
      withCredentials: true,
    });
    console.log(`Addd students {id} for interview`, res);
    return res;
  } catch (error) {
    console.error('error in creating Interviers List', error);
    throw error;
  }
};

const addForInterview = async (body,companyID) => {
  try {
    console.log(companyID,"iofffffffffffffffff");
    const res = await axios.post(`/companies/${companyID}/interviewees`, body, { withCredentials: true });
    return res.data;

  } catch (err) {
    console.error(err);

  }
}


const addInterns = async (body,companyID) => {
  try {
    const res = await axios.post(`/companies/${companyID}/interns`, body, { withCredentials: true });
    console.log('Create Interns', res);
    return res.data;
  } catch (error) {
    console.error('error in creating Interns', error);
    throw error;
  }
};


const findCompanyManagerById = async (id) => {
  try {
    const res = await axios.get(`/company-managers/${id}`, { withCredentials: true, });
    return res.data;

  } catch (err) {
    console.error('error in finding manager', err);
  }
}

export { addSuggestedStudent, addInterns, findCompanyManagerById, addForInterview };