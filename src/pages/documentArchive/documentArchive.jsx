import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/SearchBar'
import DocumentList from '../../components/DocumentList'
import axios from 'axios';

function DocumentArchive() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTermNumber, setSearchTermNumber] = useState('');
    const [searchTermName, setSearchTermName] = useState('');
    const [createdDate, setCreatedDate] = useState('');

    const handleNumberChange = (e) => {
        setSearchTermNumber(e.target.value);
    };

    const handleNameChange = (e) => {
        setSearchTermName(e.target.value);
    };

    const fetchDocuments = () => {
        let query = `?search=${searchTermName}`;
        if (searchTermNumber) query += `&document_number=${searchTermNumber}`;
        if (searchTermName) query += `&title=${searchTermName}`;
        if (createdDate) query += `&created_at=${createdDate}`;

        axios.get(`http://127.0.0.1:8000/v1/documents/${query}`)
            .then(response => {
                setDocuments(response.data);
                setLoading(false);
                console.log(response);
            })
            .catch(error => {
                console.error('Error fetching documents:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchDocuments();
    }, [searchTermName, searchTermNumber, createdDate]);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className='container mt-4'>
            <h1>Document Archive</h1>
            <SearchBar
                searchTermNumber={searchTermNumber}
                searchTermName={searchTermName}
                handleNumberChange={handleNumberChange}
                handleNameChange={handleNameChange}
                createdDate={createdDate}
                handleCreatedDateChange={(e) => setCreatedDate(e.target.value)}
            />
            <DocumentList documents={documents} />
        </div>
    )
}

export default DocumentArchive