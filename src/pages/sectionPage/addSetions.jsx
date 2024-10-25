import React, { useEffect, useState } from 'react';
import FolderContents from './content';
import Sidebar from './sectionSitebar';
import AddFolderModal from '../../components/modals/addFolderModal';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import UploadFileModal from '../../components/modals/fileuploadmodal';
import { apirl } from '../../helpers/urls';
import FileContents from './document';

function Addsections() {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showFileModal, setShowFileModal] = useState(false);
    const [datas, setDatas] = useState([]);
    const [expandedFolders, setExpandedFolders] = useState([]); // Ochilgan papkalarni saqlash uchun holat
    const [mainFolder, setmainFolder] = useState(false);
    const { folderId } = useParams();
    const navigate = useNavigate();

    // Papka tanlanganda
    const handleFolderSelect = (folder) => {
        setSelectedFolder(folder);
    };

    useEffect(() => {
        fetchSections();
    }, [folderId]);

    // Bo'limlarni olish funksiyasi
    const fetchSections = async () => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await axios.get(apirl + '/v1/folder/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (folderId !== 'All') {
                let sortedFolder = response.data.filter((item) => item.id == folderId);
                setSelectedFolder(sortedFolder[folderId]);
                setDatas(sortedFolder);
            } else {
                setDatas(response.data);
            }
        } catch (error) {
            console.error('Error fetching sections:', error);
        }
    };

    // Ota papkani topish funksiyasi
    const findParentFolder = (folders, folderId) => {
        for (const folder of folders) {
            if (folder.children && folder.children.some(child => child.id === folderId)) {
                return folder;
            }
            if (folder.children) {
                const parent = findParentFolder(folder.children, folderId);
                if (parent) return parent;
            }
        }
        return null;
    };

    // Navigatsiya yo'lini yaxshilash
    const buildBreadcrumb = (folder, folders) => {
        const breadcrumb = [];

        const findPath = (currentFolder) => {
            const parent = findParentFolder(folders, currentFolder.id);  // Ota papkani qidiramiz
            if (parent) {
                findPath(parent);  // Ota papkaga qaytamiz va rekursiv ravishda davom etamiz
            }
            breadcrumb.push(currentFolder.name);  // Har bir papka nomini qo'shamiz
        };

        findPath(folder);  // Tanlangan papkadan boshlaymiz
        return breadcrumb.join(' / ');  // Qator qilib chiqarish
    };


    // Orqaga qaytish funksiyasi
    const handleBack = () => {
        if (selectedFolder) {
            const parentFolder = findParentFolder(datas, selectedFolder.id);  // Tanlangan papka ota papkasini topamiz
            if (parentFolder) {
                setSelectedFolder(parentFolder);  // Tanlangan papkani ota papkaga o'zgartiramiz
            } else {
                console.log('Parent folder topilmadi');
            }
        }
    };

    // Papkalarni expand qilish yoki yopish funksiyasi
    const toggleFolderExpand = (folderId) => {
        setExpandedFolders((prev) =>
            prev.includes(folderId) ? prev.filter(id => id !== folderId) : [...prev, folderId]
        );
    };

    // Papkalar ochiq yoki yopiq ekanligini tekshirish
    const isFolderExpanded = (folderId) => {
        return expandedFolders.includes(folderId);
    };

    // Yangi papka qo'shish funksiyasi
    const handleAddFolder = async (folderName) => {
        try {
            const token = localStorage.getItem('access_token');
            const newFolder = {
                name: folderName,
                parent: mainFolder ? null : selectedFolder.id,
            };
            console.log(newFolder);

            const response = await axios.post(apirl + '/v1/folder/', newFolder, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const createdFolder = response.data;

            const updateFolders = (folders, folderId) => {
                return folders.map((folder) => {
                    if (folder.id === folderId) {
                        return {
                            ...folder,
                            children: [...(folder.children || []), createdFolder], // Yangi papkani bolalariga qo'shish
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
            setDatas(updatedDatas);  // Datas holatini yangilash
            setShowModal(false);
            fetchSections()
            setSelectedFolder(createdFolder);  // Tanlangan papkani yangi papka bilan o'zgartirish
            setExpandedFolders((prev) => [...prev, selectedFolder.id]); // Yangi papka qo'shilganda hozirgi ochiq holatni saqlab qolish
        } catch (error) {
            console.error('Error adding folder:', error);
        }
    };

    const handleFileUpload = async (selectedFile) => {
        try {
            const token = localStorage.getItem('access_token');
            const formData = new FormData();

            formData.append('file', selectedFile);

            const response = await axios.post('http://127.0.0.1:8000/v1/documents/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Fayl yuklandi:', response.data);
            setShowFileModal(false);
        } catch (error) {
            console.error('Faylni yuklashda xato yuz berdi:', error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 border-right h-screen pt-5" style={{ height: '90vh' }}>
                    <h2>Main folders</h2>
                    <Sidebar
                        folders={datas}
                        onFolderSelect={handleFolderSelect}
                        selectedFolder={selectedFolder}
                        onToggleExpand={toggleFolderExpand} // Ochish yoki yopish
                        isExpanded={isFolderExpanded} // Papka ochiq yoki yopiqligini tekshirish
                    />
                </div>

                <div className="col-md-9 w-100 pt-5">
                    <div className='d-flex align-items-center w-100 mb-3'>
                        <i className="fa-solid fa-arrow-left mr-3 text-dark fa-1x" onClick={handleBack}></i>
                        <div className='d-flex justify-content-between align-items-end w-100'>
                            <div className='d-flex align-items-end' >
                                <h3 className='h4 mb-0'> Navigatsiya:</h3>
                                <p className='mb-0 ml-2'> {selectedFolder ? buildBreadcrumb(selectedFolder, datas) : 'No folder selected'}</p>
                            </div>
                            <div>
                                <button className="btn btn-sm btn-success mr-2" onClick={() => setShowFileModal(true)}>
                                    Add file <i className="fa-solid fa-plus text-white"></i>
                                </button>
                                <button className="btn btn-sm btn-success" onClick={() => setShowModal(true)}>
                                    Add Folder <i className="fa-solid fa-plus text-white"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    {selectedFolder ? (
                        <FolderContents folder={selectedFolder} onFolderSelect={handleFolderSelect} />
                    ) : (
                        <p>Please select a folder to view its contents.</p>
                    )}
                    {selectedFolder && selectedFolder.documents && <FileContents file={selectedFolder} />}
                </div>
            </div>
            <UploadFileModal
                show={showFileModal}
                handleClose={() => setShowFileModal(false)}
                onSave={handleFileUpload}
            />
            <AddFolderModal
                show={showModal}
                currentFolder={selectedFolder}
                handleClose={() => setShowModal(false)}
                onSave={handleAddFolder}
                setmainFolder={setmainFolder}
            />
        </div>
    );
}

export default Addsections;
