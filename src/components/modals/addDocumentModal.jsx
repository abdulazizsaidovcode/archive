import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useFetch } from '../../hooks/fetchData';
import { document_type_url } from '../../helpers/urls';

const AddDocumentModal = ({ show, handleClose, currentFolder, onSave, documentTypes }) => {
    const [folderName, setFolderName] = useState('');
    const [title, setTitle] = useState('');
    const [permission, setPermission] = useState('PUBLIC');
    const [documentType, setDocumentType] = useState('');
    const [documentNumber, setDocumentNumber] = useState('')

    
    const input = useRef();

    const handleSave = () => {
        if (title.trim() && documentType) {
            // Saqlash uchun foydalanuvchi kiritgan ma'lumotlarni yuboramiz
            onSave({
                title,
                permission,
                document_type: +documentType,
                document_number: documentNumber,
                folder: currentFolder ? currentFolder.id : null
            });

            // Inputlarni tozalash
            setFolderName('');
            setTitle('');
            setPermission('PUBLIC');
            setDocumentType('');
            handleClose();
        } else {
            toast.warning("Iltimos, barcha maydonlarni to'ldiring");
            if (input.current.value.trim() === '') input.current.style.borderColor = 'red';
        }
    };

    // main sifatida folderni yuklashni yoqib qoyadi
    const changeMain = (e) => {
        setmainFolder(e.target.checked);
        setmainFolders(e.target.checked);
    };

    return (
        <div className={`modal fade-up ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden={!show}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addFolderModalLabel">Yangi Hujjat Qo'shish</h5>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            {/* Title input */}
                            <label htmlFor="title">Hujjat nomi</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                placeholder="Hujjat nomini kiriting"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <label htmlFor="title" className="mt-3">Hujjat raqami</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                placeholder="Hujjat raqami kiritng"
                                value={documentNumber}
                                onChange={(e) => setDocumentNumber(e.target.value)}
                            />

                            {/* Permission input */}
                            <label htmlFor="permission" className="mt-3">Ruxsat</label>
                            <select
                                className="form-control"
                                id="permission"
                                value={permission}
                                onChange={(e) => setPermission(e.target.value)}
                            >
                                <option value="PUBLIC">Public</option>
                                <option value="PRIVATE">Private</option>
                                <option value="DEPARTMENT">department</option>
                            </select>›

                            {/* Document Type input */}
                            <label htmlFor="documentType" className="mt-3">Hujjat turi</label>
                            <select
                                className="form-control"
                                id="documentType"
                                value={documentType}
                                onChange={(e) => setDocumentType(e.target.value)}
                            >
                                <option value="" disabled>Tanlang</option>
                                {documentTypes && documentTypes.map((type) => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Yopish</button>
                        <button type="button" className="btn btn-success" onClick={handleSave}>Saqlash</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddDocumentModal;
