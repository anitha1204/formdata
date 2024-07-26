import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CompanyForm from './components/CompanyForm';
import LoginRegister from './components/LoginRegister';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<LoginRegister />} />
          <Route path='/companyform' element={<CompanyForm />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
