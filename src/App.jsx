import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SectionsPage from './pages/sectionPage/SectionsPage';
import LoginPage from './pages/auth/LoginPage';
import DocumentArchive from './pages/documentArchive/documentArchive';
import Addsectoins from './pages/sectionPage/addSetions';
import Notfound from './pages/notfound/notfound';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<DocumentArchive />} />
                    <Route path="/login" element={<LoginPage />} />
                    {/* Bo'limlar sahifasi */}
                    <Route path="/departament" element={<SectionsPage />} />
                    <Route path="/sections" element={<SectionsPage />} />
                    <Route path="/add/:folderId" element={<Addsectoins />} />
                    <Route path="/*" element={<Notfound />} />
                </Routes>
            </div>
            <ToastContainer />
        </Router>
    );
}

export default App;
