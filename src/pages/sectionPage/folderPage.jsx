import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apirl } from '../../helpers/urls';
import Pagination from '../../components/pagenation';

const SectionsPage = () => {
    const [sections, setSections] = useState([]);
    const [searchFolderName, setSearchFolderName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        fetchSections();
    }, [searchFolderName, currentPage, pageSize]);

    const fetchSections = async () => {
        const url = `${apirl}/v1/folder/?name=${searchFolderName}&page=${currentPage}`;
        const token = localStorage.getItem('access_token');

        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSections(response.data.results);
            setTotalPages(Math.ceil(response.data.count / pageSize)); // Calculate total pages
        } catch (error) {
            console.error('Error fetching sections:', error);
        }
    };

    return (
        <div className="container pb-5">
            <div className='d-flex align-items-center justify-content-between mt-4'>
                <h2>Document Sections</h2>
                <input
                    type="text"
                    placeholder="folder nomi"
                    value={searchFolderName}
                    onChange={(e) => setSearchFolderName(e.target.value)}
                    className="search-input"
                />
            </div>
            <div className="mt-4">
                <div className="row">
                    {sections && sections.length ? sections.map((section) => (
                        <div onClick={() => navigate(`/add/${section.id}`)} key={section.id} className="col-md-3 mb-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                    <div className="section-icon mb-3">
                                        <i className="fa fa-folder-open fa-1x"></i>
                                    </div>
                                    <h5 className="card-title text-center">{section.name}</h5>
                                </div>
                            </div>
                        </div>
                    )) :
                        <div className='col-md-4 mb-4'>folder topilmadi</div>
                    }
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default SectionsPage;
