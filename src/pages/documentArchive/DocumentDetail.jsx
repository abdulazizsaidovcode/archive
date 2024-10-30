// src/pages/DocumentDetail.js
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DocumentContext } from '../../context/documents';
import { getFileName } from '../../hooks/truncateText';
import { apirl } from '../../helpers/urls';

function DocumentDetail() {
    const { id } = useParams();
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);

    const { documents, documentTypes } = useContext(DocumentContext)

    useEffect(() => {
        let sorted = documents.find((child) => child.id == id)
        setDocument(sorted)
    }, [id, documents]);



    if (!document) return <div className='container'><h1>Loading ....</h1></div>

    return (
        <div className='container pt-4'>
            <div className='d-flex align-items-end'>
                <h1 className='mr-3'>Document </h1>
                <h2 className='text-gray'>{document.title}</h2>
            </div>
            <div className='card p-3'>
                <p><strong>Document Number:</strong> {document.document_number}</p>
                <p><strong>Yaratilgan vaqt:</strong> {document.created_at}</p>
                <p><strong>Kim Tomonidan yaratilgan:</strong> {document.owner}</p>
                <p><strong>Document turi:</strong> {documentTypes &&  documentTypes.find((type) => type.id == document.document_type).name}</p>
                <p><strong>Permission:</strong> {document.permission}</p>
            </div>
            <div className="row">
                {document.files.length > 0 ?
                    document.files.map((child) =>

                        <a href={new URL(apirl + child.file)} target="blank" className="col-md-3 mt-4" key={child.id}>
                            <div className="card shadow-sm h-100 pt-3">
                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                    <div className="section-icon mb-3">
                                        <i className="fa-regular fa-file-lines fa-2x"></i>
                                    </div>
                                    <div className="file-container">
                                        <p className="file-name">
                                            <p className="text-center">{getFileName(apirl + child.file)}</p>
                                            <span className="tooltipp">{decodeURIComponent(child.file.split('/').pop())}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className='card-body pt-0'>
                                    <i class="fa-solid fa-arrow-right fa-2x"></i>
                                </div>
                            </div>
                        </a>
                    )
                    :
                    <p>Fayllar mavjud emas yoki yuklanmoqda... </p>
                }
            </div>
        </div>
    );
}

export default DocumentDetail;
