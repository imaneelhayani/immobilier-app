import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';

//import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import MainLayout from './Layout/MainLayout';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import ResultsPage from './Pages/ResultsPage';
import Login from './Pages/Login';
import Proprietes from './Pages/Proprietes';
import AjouterPropriete from './Pages/AjouterPropriete';
import ModifierPropriete from './Pages/ModifierPropriete';
import Clients from './Pages/Clients';
import Transactions from './Pages/Transactions';
import CommandeModal from './Pages/CommandeModal';
import Commandes from './Pages/Commandes.jsx';
import Profile from './Pages/Profile.jsx';
import Notifications from './Pages/Notifications.jsx';
import Messages from './Pages/Messages.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
        <Route path="/Register" element={<MainLayout><Register /></MainLayout>} />
+ <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/resultas" element={<MainLayout><ResultsPage /></MainLayout>} />
        <Route path="/Proprietes" element={<MainLayout><Proprietes /></MainLayout>} />
        <Route path="/AjouterPropriete" element={<MainLayout><AjouterPropriete /></MainLayout>} />
        <Route path="/ModifierPropriete/:id" element={<MainLayout><ModifierPropriete /></MainLayout>} />
        <Route path="/Clients" element={<MainLayout><Clients /></MainLayout>} />
        <Route path="/Transactions" element={<MainLayout><Transactions /></MainLayout>} />
        <Route path="/CommandeModal" element={<MainLayout><CommandeModal /></MainLayout>} />
        <Route path="/Commandes" element={<MainLayout><Commandes /></MainLayout>} />
        <Route path="/Profile" element={<MainLayout><Profile /></MainLayout>} />
        <Route path="/Notifications" element={<MainLayout><Notifications /></MainLayout>} />
        <Route path="/Messages" element={<MainLayout><Messages /></MainLayout>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;



