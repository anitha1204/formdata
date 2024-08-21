import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CompanyForm from './components/CompanyForm';
import Register from './components/Register';
import Profile from './components/Profile';
import Login from './components/Login';
import Membership from './components/Membership';
import NewUserForm from './components/NewUserForm';
import LoginRegister from './components/LoginRegister';
import Companies from './components/Companies';
import Emailtomembers from './components/Emailtomembers';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/membership' element={<Membership/>} />
          <Route path='/loginregister' element={<LoginRegister/>} />
          <Route path='/companyform' element={<CompanyForm />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/newuserform' element={<NewUserForm />} />
          <Route path='/Companies' element={<Companies />} />
          <Route path='/emailtomembers' element={<Emailtomembers/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
