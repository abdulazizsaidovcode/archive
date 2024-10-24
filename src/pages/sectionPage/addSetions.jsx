import React, { useEffect, useState } from 'react';
import FolderContents from './content';
import Sidebar from './sectionSitebar';
import AddFolderModal from './addModalFolder';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Addsections() {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [datas, setDatas] = useState([])
    const [mainFolder, setmainFolder] = useState(false)
    const { folderId } = useParams();

    // Papka tanlanganda
    const handleFolderSelect = (folder) => {
        setSelectedFolder(folder);
    };

    useEffect(() => {
        fetchSections();
    }, [folderId]);

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
            if (folderId !== 'All') {
                let sortedFolder = response.data.filter((item) => item.id == folderId)
                setSelectedFolder(sortedFolder[0])
                console.log(sortedFolder);
                setDatas(sortedFolder);  // Bo'limlarni o'rnatish
            } else {
                setDatas(response.data);
            }
        } catch (error) {
            console.error('Error fetching sections:', error);
        }
    };

    // Yangi papka qo'shish funksiyasi
    const handleAddFolder = async (folderName) => {
        if (!selectedFolder) {
            alert('Avval papkani tanlash kerak');
            console.log(selectedFolder);
            console.log(mainFolder);
            return;
        }

        try {
            const token = localStorage.getItem('access_token'); // Tokenni olish
            const newFolder = {
                name: folderName,
                parent: selectedFolder.id, // Tanlangan papka `parent`
            };

            const response = await axios.post('http://127.0.0.1:8000/v1/section/', newFolder, {
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
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 border-right h-screen pt-5" style={{height: '90vh'}}>
                    <h2>Main folders</h2>
                    <Sidebar folders={datas} onFolderSelect={handleFolderSelect} selectedFolder={selectedFolder} />
                </div>

                {/* Asosiy qism */}
                <div className="col-md-9 w-100 pt-5">
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
            <AddFolderModal show={showModal} handleClose={() => setShowModal(false)} onSave={handleAddFolder} setmainFolder={setmainFolder} />
        </div>
    );
}

export default Addsections;
