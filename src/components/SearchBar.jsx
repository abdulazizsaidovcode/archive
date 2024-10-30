import React, { useContext, useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { DocumentContext } from '../context/documents';
import axios from 'axios';

const SearchBar = () => {
    const { setDocuments, documentTypes } = useContext(DocumentContext); 
    const [localSearchName, setLocalSearchName] = useState('');
    const [localSearchNumber, setLocalSearchNumber] = useState('');
    const [localCreatedDate, setLocalCreatedDate] = useState('');
    const [documentType, setDocumentType] = useState('');

    const fetchDocuments = useCallback(async () => {
        const queryParams = new URLSearchParams();
        if (localSearchName) queryParams.append('title', localSearchName);
        if (localSearchNumber) queryParams.append('document_number', localSearchNumber);
        if (localCreatedDate) queryParams.append('created_at', localCreatedDate);
        if (documentType) queryParams.append('type', documentType);

        const url = `http://127.0.0.1:8000/v1/documents/?${queryParams.toString()}`;

        try {
            const response = await axios.get(url);
            const data = response
            setDocuments(data.data.results);
            console.log(data);
        } catch (error) {
            console.error("Failed to fetch documents:", error);
        }
    }, [localSearchName, localSearchNumber, localCreatedDate, documentType, setDocuments]);

    const debouncedFetchDocuments = debounce(fetchDocuments, 200);

    useEffect(() => {
        debouncedFetchDocuments();
        return () => debouncedFetchDocuments.cancel(); 
    }, [localSearchName, localSearchNumber, localCreatedDate, documentType]);

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="hujjat nomi"
                value={localSearchName}
                onChange={(e) => setLocalSearchName(e.target.value)}
                className="search-input"
            />

            <input
                type="text"
                placeholder="hujjat raqami"
                value={localSearchNumber}
                onChange={(e) => setLocalSearchNumber(e.target.value)}
                className="search-input"
            />

            <input
                type="date"
                value={localCreatedDate}
                onChange={(e) => setLocalCreatedDate(e.target.value)}
                className="search-input"
            />

            {documentTypes.length > 0 ? (
                <select
                    className="form-select form-select-lg"
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    aria-label="Select document type"
                >
                    <option value="">All</option>
                    {documentTypes.map((type) => (
                        <option key={type.id} value={type.name}>
                            {type.name}
                        </option>
                    ))}
                </select>
            ) : (
                <p>Loading options...</p>
            )}
        </div>
    );
};

export default SearchBar;
