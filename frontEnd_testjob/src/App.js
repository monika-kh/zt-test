import './App.css';
import Login from './Coponents/Login/Login';
import Navbar from './Coponents/Navbar/Navbar';
import Register from './Coponents/Register/Register';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Navbar /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}


function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return children;
}

export default App;
