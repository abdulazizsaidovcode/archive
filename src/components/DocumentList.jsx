// src/components/DocumentList.jsx
import React from 'react';
import './DocumentList.css';  // Hujjatlar ro'yxati uchun styling
import './table.css';  // Jadval stylingi

const DocumentList = ({ documents = []}) => {
    return (
        
        <div className="card ">
            <div className="table-responsive text-nowrap">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Hujjat Raqami</th>
                            <th>Qisqacha mazmuni</th>
                            <th>Sanasi</th>
                            <th>Yuklab olish</th>
                            {/* <th>Actions</th> */}
                        </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                        {documents.map(document => (
                            <tr key={document.id}>
                                <td><strong>{document.document_number}</strong></td>
                                <td>{document.title}</td>
                                <td>{new Date(document.created_at).toLocaleDateString()}</td>
                                <td>
                                    {/* Hujjatni yuklab olish havolasi */}
                                    <a target='blank' href={document.file} download className="btn btn-primary">
                                        Yuklab olish
                                    </a>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DocumentList;
