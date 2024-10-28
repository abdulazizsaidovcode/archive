import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SectionsPage from './pages/sectionPage/folderPage.jsx';
import LoginPage from './pages/auth/LoginPage';
import DocumentArchive from './pages/documentArchive/documentArchive';
import Addsections from './pages/sectionPage/foldersDetails.jsx';
import Notfound from './pages/notfound/notfound';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './helpers/ProtectedRoute';

import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import DocumentDetail from './pages/documentArchive/DocumentDetail.jsx';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<DocumentArchive />} />
                    <Route path="/document/:id" element={<ProtectedRoute><DocumentDetail /></ProtectedRoute>}/>
                    <Route path="/departament" element={<ProtectedRoute><SectionsPage /></ProtectedRoute>} />
                    <Route path="/sections" element={<ProtectedRoute><SectionsPage /></ProtectedRoute>} />
                    <Route path="/add/:folderId" element={<ProtectedRoute><Addsections /></ProtectedRoute>} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/*" element={<Notfound />} />
                </Routes>
                    

            </div>
            <ToastContainer />
        </Router>
    );
}

export default App;
