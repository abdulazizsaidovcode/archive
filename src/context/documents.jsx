// src/context/DocumentContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { document_type_url, document_url } from '../helpers/urls';

export const DocumentContext = createContext();

export const DocumentProvider = ({ children }) => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(10);
    const [documentTypes, setDocumentTypes] = useState([]);

    useEffect(() => {
        const fetchDocumentTypes = async () => {
            let token = localStorage.getItem('access_token');

            try {
                const { data } = await axios.get(document_type_url);
                setDocumentTypes(data);
            } catch (error) {
                console.error('Error fetching document types:', error);
            }
        };
        fetchDocumentTypes();
    }, []);

    const fetchDocuments = async () => {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        let query = `?page=${currentPage}`;

        try {
            const { data } = await axios.get(`${document_url}${query}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setDocuments(data.results);
            setTotalPages(Math.ceil(data.count / pageSize));
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    return (
        <DocumentContext.Provider value={{
            documents,
            setDocuments,
            loading,
            currentPage,
            totalPages,
            setCurrentPage,
            documentTypes,
            setDocumentTypes
        }}>
            {children}
        </DocumentContext.Provider>
    );
};
