// src/pages/sectionPage/DocumentArchive.jsx
import React, { useContext } from 'react';
import SearchBar from '../../components/SearchBar';
import DocumentList from '../../components/DocumentList';
import Pagination from '../../components/pagenation';
import { DocumentContext } from '../../context/documents';

function DocumentArchive() {
    const { documents, loading, currentPage, totalPages, pageSize, setCurrentPage } = useContext(DocumentContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container mt-4'>
            <h1>Document Archive</h1>
            <SearchBar page={currentPage} />
            <DocumentList documents={documents} />
            <div className='py-4'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default DocumentArchive;
