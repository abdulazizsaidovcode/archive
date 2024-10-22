import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SectionsPage = () => {
    const [sections, setSections] = useState([]); // Bo'limlar ro'yxati
    const [sectionName, setSectionName] = useState(''); // Yangi bo'lim nomi
    const [parentSection, setParentSection] = useState(null); // Parent bo'limi
    const navigate = useNavigate(); // Navigate funksiyasi

    useEffect(() => {
        fetchSections();
    }, []);

    // Bo'limlarni olish (APIdan irarxik tarzda)
    const fetchSections = async () => {
        const token = localStorage.getItem('access_token'); // Tokenni localStorage'dan oling
        try {
            const response = await axios.get('http://127.0.0.1:8000/v1/document_section/',
                {
                    headers: {
                        'Authorization': `Bearer ${token}` // Tokenni header'ga qo'shish
                    }
                }
            );
            console.log(response);
            setSections(response.data);
        } catch (error) {
            console.error('Error fetching sections:', error);
        }
    };

    // Yangi bo'lim yaratish funksiyasi
    const handleCreateSection = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token'); // Tokenni localStorage'dan oling
        try {
            const response = await axios.post('http://127.0.0.1:8000/v1/document_section/', {
                name: sectionName,
                parent: parentSection, // Parent bo'limni yuboramiz
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Tokenni header'ga qo'shish
                }
            }

            );
            // Yangi bo'lim yaratildi, formani tozalaymiz va bo'limlarni yangilaymiz
            setSectionName('');
            setParentSection(null);
            fetchSections();
        } catch (error) {
            console.error('Error creating section:', error);
        }
    };

    // Rekursiv tarzda bo'limlar ierarxiyasini ko'rsatish funksiyasi
    const renderSections = (sections, level = 0) => {
        return sections.map((section) => (
            <option key={section.id} value={section.id}>
                {`${'—'.repeat(level)} ${section.name}`}
                {section.children.length > 0 && renderSections(section.children, level + 1)}
            </option>
        ));
    };

    return (
        <div className="container">
            <h2 className='mt-4'>Document Sections</h2>

            {/* Yangi bo'lim yaratish formasi */}
            <form onSubmit={handleCreateSection} className="mb-3">
                <div className="mb-2">
                    <label>Section Name:</label>
                    <input
                        type="text"
                        value={sectionName}
                        onChange={(e) => setSectionName(e.target.value)}
                        placeholder="Enter section name"
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label>Select Parent Section (optional):</label>
                    <select
                        className="form-control"
                        value={parentSection || ''}
                        onChange={(e) => setParentSection(e.target.value)}
                    >
                        <option value="">No Parent (Root Level)</option>
                        {renderSections(sections)} {/* Bo'limlar irarxiyasini ko'rsatish */}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Create Section</button>
            </form>
            <div className=" mt-4">
                <div className="row">
                    {/* Har bir bo'limni card shaklida chiqarish */}
                    {sections.map((section) => (
                        <div onClick={() => navigate(`/add/${section.id}`)} key={section.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                    {/* Icon va bo'lim nomi */}
                                    <div className="section-icon mb-3">
                                        {/* Iconni qo'shing, agar kerak bo'lsa */}
                                        <i className="fa fa-folder-open fa-1x"></i>
                                    </div>
                                    <h5 className="card-title text-center">{section.name}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SectionsPage;
