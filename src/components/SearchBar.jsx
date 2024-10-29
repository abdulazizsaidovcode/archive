// src/components/SearchBar.js
import React from 'react';
import './SearchBar.css';  // Qidiruv paneli uchun styling

const SearchBar = ({ searchTermNumber, searchTermName, handleNumberChange, handleNameChange, createdDate, handleCreatedDateChange, documentTypes, setDocumentType, documentType }) => {

    console.log(documentTypes);

    return (
        <div className="search-bar">

            <input
                type="text"
                placeholder="hujjat nomi"
                value={searchTermName}
                onChange={handleNameChange}
                className="search-input"
            />
            <input
                type="text"
                placeholder="hujjat nomi"
                value={searchTermNumber}
                onChange={handleNumberChange}
                className="search-input"
            />
            {/* Sana bo'yicha qidirish */}
            <input
                type="date"
                value={createdDate}
                onChange={handleCreatedDateChange}
                className="search-input"
            />
            {documentTypes && documentTypes.length > 0 ? (
                <select className='form-select form-select-lg' aria-label=".form-select-lg example">
                    <option value="">All</option>
                    {documentTypes.map((type) => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                </select>
            ) : (
                <p>Loading options...</p>
            )
            }

        </div >
    );
};

export default SearchBar;

