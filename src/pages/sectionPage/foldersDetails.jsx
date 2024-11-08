import React, { useEffect, useState } from 'react';
import FolderContents from './content';
import AddFolderModal from '../../components/modals/addFolderModal';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import UploadFileModal from '../../components/modals/fileuploadmodal';
import { apirl, document_file_url, document_type_url, document_url, folder_Url } from '../../helpers/urls';
import FileContents from './document';
import { toast } from 'react-toastify';
import FolderDetailSidebar from '../../components/sitebar/folderDetailSitebar';
import AddDocumentModal from '../../components/modals/addDocumentModal';
import { DeleteData, PutData, useFetch } from '../../hooks/fetchData';
import DocumentFileContents from './documentFile';
import Pagination from '../../components/pagenation';
import { DeletModal } from '../../components/modals/deleteModal';
import { config } from '../../helpers/token';
import axiosInstance from '../../helpers/axiosInstance';
import EditFolderModal from '../../components/modals/editFolderModal';

function Addsections() {
    const [showModal, setShowModal] = useState(false);
    const [showDocumentModal, setShowDocumentModal] = useState(false);
    const [showFileModal, setShowFileModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditFolderModal, setShowEditFolderModal] = useState(false);


    const [selectedItem, setSelecteditem] = useState('')
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [selectedDocument, setSelectedDocument] = useState('');
    const [datas, setDatas] = useState([]);
    const [expandedFolders, setExpandedFolders] = useState([]); // Ochilgan papkalarni saqlash uchun holat
    const [mainFolder, setmainFolder] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const { folderId } = useParams();
    const navigate = useNavigate();

    const { data: docimentType } = useFetch(document_type_url)

    useEffect(() => {
        fetchSections();
    }, [folderId, currentPage, pageSize]);


    // folder va documentni kuzatadi 
    useEffect(() => {
        // Recursive function to find a folder or document by id in a nested structure
        const findInTree = (folders, id) => {
            for (let folder of folders) {
                // Check if we found the folder
                if (folder.id === id) {
                    return { folder };  // Return the folder if found
                }

                // If it's not the folder, check documents inside this folder
                if (folder.documents) {
                    const foundDocument = folder.documents.find(doc => doc.id === id);
                    if (foundDocument) {
                        return { folder, document: foundDocument };  // Return both the folder and the document
                    }
                }

                // If the folder has children, recurse into the children
                if (folder.children) {
                    const foundInChildren = findInTree(folder.children, id);
                    if (foundInChildren) {
                        return foundInChildren;  // Return found folder/document from children
                    }
                }
            }
            return null;  // Return null if nothing is found
        };

        // Check if data has changed and folderId is valid
        if (datas.length > 0 && selectedFolder && selectedFolder.id) {
            const found = findInTree(datas, parseInt(selectedFolder.id));

            if (found) {
                // If we found the folder, update selectedFolder state
                setSelectedFolder(found.folder);
                
                // If we also found a document, update selectedDocument state
                if (selectedDocument && found.folder.documents) {
                    setSelectedDocument(found.folder.documents.find(doc => doc.id === selectedDocument.id));  // Update selectedDocument state
                }
            }
        }

    }, [datas, folderId, selectedFolder?.id]);

    // Function to update the cache with new folder or document data
    // const updateCache = (existingData, newData) => {
    //     const findById = (data, itemId) => {
    //         for (let item of data) {
    //             if (item.id === itemId) {
    //                 return item;
    //             }
    //             if (item.children) {
    //                 let found = findById(item.children, itemId);
    //                 if (found) return found;
    //             }
    //             if (item.documents) {
    //                 let found = findById(item.documents, itemId);
    //                 if (found) return found;
    //             }
    //         }
    //         return null;
    //     };

    //     const addNewFilesAndFolders = (existingData, incomingData) => {
    //         for (let newItem of incomingData) {
    //             let existingItem = findById(existingData, newItem.id);

    //             if (!existingItem) {
    //                 if (newItem.children) {
    //                     newItem.children = addNewFilesAndFolders(existingData, newItem.children);
    //                 }
    //                 existingData.push(newItem);
    //             } else {
    //                 if (newItem.documents) {
    //                     for (let newDoc of newItem.documents) {
    //                         let existingDoc = findById(existingItem.documents || [], newDoc.id);
    //                         if (!existingDoc) {
    //                             existingItem.documents = existingItem.documents || [];
    //                             existingItem.documents.push(newDoc);
    //                         }
    //                     }
    //                 }
    //             }
    //         }

    //         return existingData;
    //     };

    //     return addNewFilesAndFolders(existingData, newData.results);
    // };

    const fetchSections = async () => {
        try {
            const response = await axios.get(apirl + `v1/folder/?page=${currentPage}`, config);
            const newData = response.data;

            setTotalPages(Math.ceil(newData.count / pageSize));
            setDatas(newData.results);

            // If folderId is provided, find the selected folder within the new data
            if (folderId && folderId !== 'All') {
                const foundFolder = newData.results.find(folder => folder.id === folderId);
                if (foundFolder) {
                    setSelectedFolder(foundFolder);
                }
            }
        } catch (error) {
            console.error('Error fetching sections:', error);
        }
    };

    // If datas changes, update selectedFolder if it exists in the new data
    // useEffect(() => {
    //     if (datas.length > 0 && folderId && folderId !== 'All') {
    //         const foundFolder = datas.find(folder => folder.id === folderId);
    //         if (foundFolder && selectedFolder?.id !== foundFolder.id) {
    //             setSelectedFolder(foundFolder);
    //         }
    //     }
    // }, [datas, folderId]);

    const handleAddFolder = async (folderName) => {
        try {
            const token = localStorage.getItem('access_token');
            const newFolder = {
                name: folderName,
                parent: selectedFolder ? selectedFolder.id : null,
            };

            const response = await axios.post(apirl + '/v1/folder/', newFolder, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            // const createdFolder = response.data;
            // const updatedFolders = updateCache(datas, { results: [createdFolder] });

            // setDatas(updatedFolders);
            fetchSections(); // Refresh data from server
            setShowModal(false);
        } catch (error) {
            toast.error('Error creating folder');
        }
    };

    // Handle back navigation function
    const handleBack = () => {
        if (selectedFolder) {
            const parentFolder = findParentFolder(datas, selectedFolder.id);
            if (parentFolder) {
                setSelectedFolder(parentFolder);
            }
        }
    };

    // Function to find the parent folder of the selected folder
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

    // Function to update the cache with new folder or document data

    const handleFolderSelect = (folder) => {
        setSelectedFolder(folder);
        setSelectedDocument('');
    };


    // Folder Expansion toggler
    const toggleFolderExpand = (folderId) => {
        setExpandedFolders((prev) =>
            prev.includes(folderId) ? prev.filter(id => id !== folderId) : [...prev, folderId]
        );
    };

    const isFolderExpanded = (folderId) => {
        return expandedFolders.includes(folderId);
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
            fetchSections();
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
            fetchSections();
        } catch (error) {
            toast.error('Faylni yuklashda xato yuz berdi:', error);
        }
    };
    const deleteFolder = () => {
        DeleteData(folder_Url, selectedItem.id)
        console.log(selectedItem);
    }

    const putFolderDocument = () => {
        const newFolder = {
            name: selectedItem.name,
            parent: mainFolder ? null : selectedItem.id,
        };

        console.log('nimadir:', newFolder);

        PutData(folder_Url, newFolder, selectedItem.id);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 border-right h-screen pt-5" style={{ height: '90vh' }}>
                    <h2>Main folders</h2>
                    <FolderDetailSidebar
                        folders={datas}
                        onFolderSelect={handleFolderSelect}
                        selectedFolder={selectedFolder}
                        onToggleExpand={toggleFolderExpand}
                        isExpanded={isFolderExpanded}
                    />
                    {folderId == 'All' && <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        onPageChange={setCurrentPage}
                    />}
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
                        <FolderContents folder={selectedFolder} onFolderSelect={handleFolderSelect} setShowDeleteModal={() => { setShowDeleteModal(true) }} setSelecteditem={setSelecteditem} setShowEditFolderModal={() => { setShowEditFolderModal(true) }} />
                    ) : (
                        !selectedDocument && <p>Avval biron bir folderni tanlang !</p>
                    )}
                    {!selectedDocument && selectedFolder && selectedFolder.documents && <FileContents file={selectedFolder} clear={''} setSelectedDocument={setSelectedDocument} />}
                    {selectedDocument && < DocumentFileContents file={selectedDocument} openModal={() => setShowFileModal(true)} />}
                    {!selectedFolder?.children && !selectedFolder?.documents?.length && <p>file yoki folder topilmadi !</p>}

                </div>
            </div>

            {/* --------- modals ---------- */}
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
            <EditFolderModal
                show={showEditFolderModal}
                currentFolder={selectedFolder}
                handleClose={() => setShowEditFolderModal(false)}
                onSave={putFolderDocument}
                setmainFolder={setmainFolder}
            />
            <DeletModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                onSave={deleteFolder}
            />
        </div>
    );
}

export default Addsections;
