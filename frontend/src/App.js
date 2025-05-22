import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';


import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import MainLayout from './Layout/MainLayout';
import Register from './Pages/Register';
import Login from './Login';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/Register" element={<MainLayout><Register /></MainLayout>} />
        <Route path="/Login" element={<MainLayout><Login /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



