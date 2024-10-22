import React, { useEffect, useState } from 'react';
import FolderContents from './content';
import Sidebar from './sectionSitebar';
import AddFolderModal from './addModalFolder';
import axios from 'axios';

function Addsections() {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [datas, setDatas] = useState([])

    // Papka tanlanganda
    const handleFolderSelect = (folder) => {
        setSelectedFolder(folder);
    };

    useEffect(() => {
        fetchSections();
    }, []);

    // Bo'limlarni olish funksiyasi
    const fetchSections = async () => {
        const token = localStorage.getItem('access_token'); // Tokenni localStorage'dan oling
        try {
            const response = await axios.get('http://127.0.0.1:8000/v1/document_section/', {
                headers: {
                    'Authorization': `Bearer ${token}` // Tokenni header'ga qo'shish
                }
            });
            console.log(response);
            setDatas(response.data);  // Bo'limlarni o'rnatish
        } catch (error) {
            console.error('Error fetching sections:', error);
        }
    };

    // Yangi papka qo'shish funksiyasi
    const handleAddFolder = async (folderName) => {
        if (!selectedFolder) {
            alert('Avval papkani tanlash kerak');
            return;
        }

        try {
            const token = localStorage.getItem('access_token'); // Tokenni olish
            const newFolder = {
                name: folderName,
                parent: selectedFolder.id, // Tanlangan papka `parent`
            };

            const response = await axios.post('http://127.0.0.1:8000/v1/document_section/', newFolder, {
                headers: {
                    'Authorization': `Bearer ${token}` // Tokenni qo'shish
                }
            });
            console.log(response);

            const createdFolder = response.data; // Serverdan qaytgan yangi papka

            // Lokal ma'lumotlarda yangi papkani qo'shish
            const updateFolders = (folders, folderId) => {
                return folders.map((folder) => {
                    if (folder.id === folderId) {
                        return {
                            ...folder,
                            children: [...folder.children, createdFolder], // Yangi papkani qo'shish
                        };
                    } else if (folder.children && folder.children.length > 0) {
                        return {
                            ...folder,
                            children: updateFolders(folder.children, folderId), // Rekursiv qo'shish
                        };
                    }
                    return folder;
                });
            };

            const updatedDatas = updateFolders(datas, selectedFolder.id);
            setDatas(updatedDatas); // Ma'lumotlarni yangilash
            setShowModal(false); // Modalni yopish
        } catch (error) {
            console.error('Error adding folder:', error);
        }
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-4">
                    <Sidebar folders={datas} onFolderSelect={handleFolderSelect} selectedFolder={selectedFolder} />
                </div>

                {/* Asosiy qism */}
                <div className="col-md-8">
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3>Selected Folder: {selectedFolder ? selectedFolder.name : ''}</h3>
                        <button className="btn btn-sm btn-success" onClick={() => setShowModal(true)}>Add Folder</button>
                    </div>
                    {selectedFolder ? (
                        <FolderContents folder={selectedFolder} onFolderSelect={handleFolderSelect} />
                    ) : (
                        <p>Please select a folder to view its contents.</p>
                    )}
                </div>
            </div>
            {/* Modal */}
            <AddFolderModal show={showModal} handleClose={() => setShowModal(false)} onSave={handleAddFolder} />
        </div>
    );
}

export default Addsections;
