import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SectionsPage = () => {
    const [sections, setSections] = useState([]); // Bo'limlar ro'yxati
    const [sectionName, setSectionName] = useState(''); // Yangi bo'lim nomi
    const [parentSection, setParentSection] = useState(null); // Parent bo'limi

    useEffect(() => {
        fetchSections();
    }, []);

    console.log('salom');
    
    // Bo'limlarni olish (APIdan irarxik tarzda)
    const fetchSections = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/sections/');
            setSections(response.data);
            console.log(response);

        } catch (error) {
            console.error('Error fetching sections:', error);
        }
    };

    // Yangi bo'lim yaratish funksiyasi
    const handleCreateSection = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/sections/', {
                name: sectionName,
                parent: parentSection, // Parent bo'limni yuboramiz
            });
            // Yangi bo'lim yaratildi, formani tozalaymiz va bo'limlarni yangilaymiz
            setSectionName('');
            setParentSection(null);
            fetchSections();
        } catch (error) {
            console.error('Error creating section:', error);
        }
    };

    // Rekursiv tarzda bo'limlar ierarxiyasini ko'rsatish funksiyasi
    const renderSections = (sections) => {
        return sections.map((section) => (
            <option key={section.id} value={section.id}>
                {section.name}
                {section.children.length > 0 && renderSections(section.children)}
            </option>
        ));
    };

    return (
        <div className="container mt-4">
            <h2>Document Sections</h2>
            
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
                        value={parentSection}
                        onChange={(e) => setParentSection(e.target.value)}
                    >
                        <option value="">No Parent (Root Level)</option>
                        {renderSections(sections)} {/* Bo'limlar irarxiyasini ko'rsatish */}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Create Section</button>
            </form>

            {/* Bo'limlar ro'yxati */}
            <h4>Sections</h4>
            <ul className="list-group mb-3">
                {sections.map((section) => (
                    <li key={section.id} className="list-group-item">
                        {section.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SectionsPage;
