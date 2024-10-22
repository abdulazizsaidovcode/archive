// src/components/SearchBar.js
import React from 'react';
import './SearchBar.css';  // Qidiruv paneli uchun styling

const SearchBar = ({ searchTermNumber, searchTermName, handleNumberChange, handleNameChange,  createdDate, handleCreatedDateChange }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="hujjat raqami"
                value={searchTermNumber}
                onChange={handleNumberChange}
                className="search-input"
            />
            <input
                type="text"
                placeholder="hujjat nomi"
                value={searchTermName}
                onChange={handleNameChange}
                className="search-input"
            />
            {/* Sana bo'yicha qidirish */}
            <input
                type="date"
                value={createdDate}
                onChange={handleCreatedDateChange}
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;

