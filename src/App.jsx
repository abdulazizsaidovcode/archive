// import './components/core.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SectionsPage from './pages/sectionPage/SectionsPage';
import LoginPage from './pages/auth/LoginPage';
import DocumentArchive from './pages/documentArchive/documentArchive';
import FolderAccordion from './pages/sectionPage/addSetions';
import Addsectoins from './pages/sectionPage/addSetions';

function App() {
    const data = [
        {
            id: 1,
            name: 'Texnik Topshiriqlar',
            parent: null,
            children: [
                {
                    id: 2,
                    name: 'Oilaviy tadbirkorlik',
                    parent: 1,
                    children: [
                        {
                            id: 3,
                            name: 'Olivaiy tadbirkorlik texnik topshiriq 35',
                            parent: 2,
                            children: [
                                {
                                    id: 4,
                                    name: 'nimadur',
                                    parent: 3,
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ];

    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    {/* Bo'limlar sahifasi */}
                    <Route path="/sections" element={<SectionsPage />} />
                    <Route path="/" element={<DocumentArchive />} />
                    <Route path="/add" element={<Addsectoins />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
