// src/pages/DocumentDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DocumentDetail() {
    const { id } = useParams();
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/v1/documents/${id}/`)
            .then(response => {
                setDocument(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching document details:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!document) return <div>Document not found</div>;

    return (
        <div className='container'>
            <h1>Document </h1>
            <h2>{document.title}</h2>
            <p><strong>Document Number:</strong> {document.document_number}</p>
            <p><strong>Created At:</strong> {document.created_at}</p>
            <p><strong>Owner:</strong> {document.owner}</p>
            <p><strong>Type:</strong> {document.document_type}</p>
            <p><strong>Permission:</strong> {document.permission}</p>
        </div>
    );
}

export default DocumentDetail;
