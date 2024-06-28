import { axios } from '../utils/axios';

const addCompanyManager = async (data) => {
  try {
    const res = await axios.post('/company-managers', data, {
      withCredentials: true,
    });
    console.log('create Company Manager', res);
    return res.data;
  } catch (error) {
    console.error('error in creating Company Manager', error);
    throw error;
  }
};

const viewStudentList = async () => {
  try {
    const res = await axios.get('/students', {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error('error in getting student list', error);
    throw error;
  }
};

const getAllCompany = () => {
  try {
    const res = axios.get('/companies', {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.error('error in getting all companies', error);
    throw error;
  }
};

const suggestStudent = async (studentId, companyId) => {
  try {
    const res = await axios.post(
      `companies/${companyId}/suggested-students`,
      { studentId },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error('error in suggesting student', error);
    throw error;
  }
};

export { addCompanyManager, viewStudentList, getAllCompany, suggestStudent };