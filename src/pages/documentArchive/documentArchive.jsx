import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/SearchBar'
import DocumentList from '../../components/DocumentList'
import axios from 'axios';
import Pagination from '../../components/pagenation';
import { document_type_url } from '../../helpers/urls';
import { useFetch } from '../../hooks/fetchData';

function DocumentArchive() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTermNumber, setSearchTermNumber] = useState('');
    const [searchTermName, setSearchTermName] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [documentType, setDocumentType] = useState('');

    const { data: documentTypes } = useFetch(document_type_url)
    console.log(documentTypes);
    

    const handleNumberChange = (e) => {
        setSearchTermNumber(e.target.value);
    };

    const handleNameChange = (e) => {
        setSearchTermName(e.target.value);
    };

    const fetchDocuments = () => {
        const token = localStorage.getItem('access_token');

        let query = `?search=${searchTermName}&page=${currentPage}`;
        if (searchTermNumber) query += `&document_number=${searchTermNumber}`;
        if (searchTermName) query += `&title=${searchTermName}`;
        if (createdDate) query += `&created_at=${createdDate}`;
        if (documentType) query += `&type=${documentType}`;

        axios.get(`http://127.0.0.1:8000/v1/documents/${query}`)
            .then(response => {
                setDocuments(response.data.results);
                setLoading(false);
                console.log(response.data.count / 10);

                setTotalPages(Math.ceil(response.data.count / 10)); // Calculate total pages
            })
            .catch(error => {
                console.error('Error fetching documents:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchDocuments();

    }, [searchTermName, searchTermNumber, createdDate, currentPage, totalPages]);

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
                
                setDocumentType={setDocumentType}
                documentType={documentType}
                documentTypes={documentTypes}
            />
            <DocumentList documents={documents} />
            <div className='py-4'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default DocumentArchive