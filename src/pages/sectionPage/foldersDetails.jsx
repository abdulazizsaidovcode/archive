import React, { useEffect, useState } from 'react';
import FolderContents from './content';
import AddFolderModal from '../../components/modals/addFolderModal';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import UploadFileModal from '../../components/modals/fileuploadmodal';
import { apirl, document_file_url, document_type_url, document_url } from '../../helpers/urls';
import FileContents from './document';
import { toast } from 'react-toastify';
import FolderDetailSidebar from '../../components/sitebar/folderDetailSitebar';
import AddDocumentModal from '../../components/modals/addDocumentModal';
import { useFetch } from '../../hooks/fetchData';
import DocumentFileContents from './documentFile';

function Addsections() {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showFileModal, setShowFileModal] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState('');
    const [showDocumentModal, setShowDocumentModal] = useState(false);
    const [datas, setDatas] = useState([]);
    const [expandedFolders, setExpandedFolders] = useState([]); // Ochilgan papkalarni saqlash uchun holat
    const [mainFolder, setmainFolder] = useState(false);
    const { folderId } = useParams();
    const navigate = useNavigate();

    const { data: docimentType } = useFetch(document_type_url)


    // Papka tanlanganda
    const handleFolderSelect = (folder) => {
        setSelectedFolder(folder);
        setSelectedDocument('')
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
                let sortedFolder = response.data.results.filter((item) => item.id == folderId);
                setSelectedFolder(sortedFolder[folderId]);
                setDatas(sortedFolder);
            } else {
                setDatas(response.data.results);
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
        if (selectedDocument) {
            setSelectedDocument('')
        } else {
            if (selectedFolder) {
                const parentFolder = findParentFolder(datas, selectedFolder.id);  // Tanlangan papka ota papkasini topamiz
                if (parentFolder) {
                    setSelectedFolder(parentFolder);  // Tanlangan papkani ota papkaga o'zgartiramiz
                } else {
                    console.log('Parent folder topilmadi');
                }
            }
            setSelectedDocument('')
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
            console.log(selectedFolder, 1234);
            if (selectedFolder == null) {
                toast.warning('you need select folder or you need mark create main folder ')
            }

            const newFolder = {
                name: folderName,
                parent: mainFolder ? null : selectedFolder.id,
            };

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
            formData.append('document', selectedDocument.id);
            console.log(selectedDocument.id, 1244);
            
            // APIga faylni yuklash
            const response = await axios.post(document_file_url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success('Fayl yuklandi:', response.data);
            setShowFileModal(false);
        } catch (error) {
            toast.error('Faylni yuklashda xato yuz berdi:', error);
        }
    };
    const handleDocumentUpload = async (selectedFile) => {
        try {
            const token = localStorage.getItem('access_token');

            // APIga faylni yuklash
            console.log(selectedFile);
            let newData = {
                ...selectedFile,
                "created_at": "2024-10-28",
                "folder": selectedFolder.id,
                "owner": 1,
            }

            console.log(newData);


            const response = await axios.post(document_url, newData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success('Fayl yuklandi: ');
            setShowFileModal(false);
            console.log(response);

        } catch (error) {
            toast.error('Faylni yuklashda xato yuz berdi:', error);
        }
    };



    console.log(selectedFolder);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 border-right h-screen pt-5" style={{ height: '90vh' }}>
                    <h2>Main folders</h2>
                    <FolderDetailSidebar
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
                                {!selectedDocument && selectedFolder && !selectedFolder.children && <button className="btn btn-sm btn-success mr-2" onClick={() => setShowDocumentModal(true)}>
                                    Add file <i className="fa-solid fa-plus text-white"></i>
                                </button>}
                                {((selectedFolder && !selectedFolder.documents.length) || (selectedFolder == null)) && <button className="btn btn-sm btn-success" onClick={() => setShowModal(true)}>
                                    Add Folder <i className="fa-solid fa-plus text-white"></i>
                                </button>}
                            </div>
                        </div>
                    </div>
                    {selectedFolder && (!selectedFolder.documents.length || selectedFolder) ? (
                        <FolderContents folder={selectedFolder} onFolderSelect={handleFolderSelect} />
                    ) : (
                        !selectedDocument && <p>Avval biron bir folderni tanlang !</p>
                    )}
                    {!selectedDocument && selectedFolder && selectedFolder.documents && <FileContents file={selectedFolder} clear={''} setSelectedDocument={setSelectedDocument} />}
                    {selectedDocument && < DocumentFileContents file={selectedDocument} openModal={() => setShowFileModal(true)} />}

                    {!selectedFolder?.children && !selectedFolder?.documents?.length && <p>file yoki folder topilmadi !</p>}

                </div>
            </div>
            <AddDocumentModal
                show={showDocumentModal}
                handleClose={() => setShowDocumentModal(false)}
                onSave={handleDocumentUpload}
                documentTypes={docimentType}
            />
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
