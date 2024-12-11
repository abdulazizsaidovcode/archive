// src/components/DocumentList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DocumentList = ({ documents = [] }) => {

    const navigate = useNavigate();

    const handleDocumentClick = (id) => {
        navigate(`/document/${id}`);
    };

    // const handleDownloadClick = (documentId) => {
    //     axios.get(`http://127.0.0.1:8000/v1/documents/${documentId}/download`, {
    //         responseType: 'blob', // important for downloading files
    //     }).then(response => {
    //         const url = window.URL.createObjectURL(new Blob([response.data]));
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', 'document.pdf'); // or set dynamic filename
    //         document.body.appendChild(link);
    //         link.click();
    //         link.remove();
    //     }).catch(error => console.error('Error downloading document:', error));
    // };
    console.log(documents);
    
    
    return (

        <div className="table">
            <div className="table-responsive text-nowrap">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Hujjat Raqami</th>
                            <th>Qisqacha mazmuni</th>
                            <th>Sanasi</th>
                            {/* <th>Yuklab olish</th> */}
                            {/* <th>Actions</th> */}
                        </tr>
                    </thead>
                    {/* {documents && documents.length && documents.map((doc) => (
                        <div key={doc.id} onClick={() => handleDocumentClick(doc.id)}>
                            <h3>{doc.title}</h3>
                            <p>Document Number: {doc.document_number}</p>
                            <button onClick={(e) => { e.stopPropagation(); handleDownloadClick(doc.id); }}>
                                Download
                            </button>
                        </div>
                    ))} */}
                    <tbody className="table-border-bottom-0">
                        {documents && documents.length && documents.map(document => (
                            <tr onClick={() => handleDocumentClick(document.id)} key={document.id}>
                                <td><strong>{document.document_number}</strong></td>
                                <td>{document.title}</td>
                                <td>{new Date(document.created_at).toLocaleDateString()}</td>
                                {/* <td>
                                    <a onClick={(e) => { e.stopPropagation(); handleDownloadClick(document.id); }} target='blank' href={document.file} download className="btn btn-primary">
                                        Yuklab olish
                                    </a>
                                </td> */}

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DocumentList;
