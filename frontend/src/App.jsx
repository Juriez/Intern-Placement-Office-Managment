import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import RegistrationTypeSelection from './components/authentication/RegistrationTypeSelection'
import Login from './components/authentication/Login'
import Home from './Home'
import ForgotPassword from './components/authentication/ForgotPassword'
import About from './About'


import Student_Signup from './components/authentication/Student_Signup'
import StudentDashboard from './components/students/Stu_dashboard'
import Stu_dashboard from './components/students/Stu_dashboard'
import UploadComponent from './components/students/Upload'
import UploadProfilePicture from './components/students/UploadProfilePicture'
import UploadSkillset from './components/students/Upload_CGPA_&_Skills'
import CompanyList from './components/students/CompanyList'
import CompanyDetail from './components/students/CompanyDetails'



import Ipoc_Signup from './components/authentication/Ipoc_Signup'
import IpocDashboard from './components/Ipoc/IpocDashboard'
import AddCompanyDetail from './components/Ipoc/AddCompanyDetail'
import AddCompanyManager from './components/Ipoc/AddCompanyManager'
import { CompanyProvider  } from './components/Ipoc/CompanyContext'
import StudentList from './components/Ipoc/StudentsList'
import CompanyModal from './components/Ipoc/SuggestStudent'



import Company_Signup from './components/authentication/Company_Signup'
import CompanyDashboard from './components/company/CompanyDashboard'
import SuggestedInterns from './components/company/SuggestedInterns'
import AddInterviews from './components/company/AddInterviews'
import AddInterns from './components/company/AddInterns'


function App() {
 

  return (
    <CompanyProvider>
    <BrowserRouter>
      <Routes>
    

                <Route path="/student_register" element={<Student_Signup />} />
                <Route path="/ipoc_register" element={<Ipoc_Signup />} />
                <Route path="/company_register" element={<Company_Signup />} />


                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/registration-type" element={<RegistrationTypeSelection />} />

        
                <Route path="/upload" element={<UploadComponent />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/studentdashboard" element={<StudentDashboard />} />
                <Route path="/ipoc-dashboard" element={<IpocDashboard />} />
                <Route path="/company-dashboard" element={<CompanyDashboard />} />
                <Route path="/stu_dashboard" element={<Stu_dashboard />} />
                <Route path="/about" element={<About />}/>

    
                <Route path="/students-list" element={<StudentList />} />
                
                <Route path="/UploadSkillset" element={<UploadSkillset />} />
                <Route path="/companyList" element={<CompanyList />} />
                <Route path="/company/:companyId" element={<CompanyDetail />} />
                <Route path="/addcompanyDetail" element={<AddCompanyDetail />} />
                <Route path="/add-company-manager" element={<AddCompanyManager />} />
                <Route path="/student-list" element={<StudentList />} />
                <Route path="/suggested-interns" element={<SuggestedInterns />}/>
                <Route path="/add-interviews/:id" element={<AddInterviews />} />
                <Route path="/add-interns/:id" element={<AddInterns />} />
                <Route path="/suggested-student" element={<CompanyModal />}/>

          
                <Route path="/upload-profile-picture" element={<UploadProfilePicture />} />
            </Routes>
    </BrowserRouter>
    </CompanyProvider>
     
  )
}

export default App