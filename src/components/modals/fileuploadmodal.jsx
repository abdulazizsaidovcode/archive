import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';

function UploadFileModal({ show, handleClose, onSave }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileUpload = useRef()

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSave = () => {
        if (selectedFile) {
            onSave(selectedFile); // Faqat faylni jo'natamiz
        } else {
            toast.warning('Iltimos, faylni tanlang');
            fileUpload.current.style.borderColor = 'red'
        }
    };

    return (

        <div className={`modal fade-up ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Fayl yuklash</h5>
                        <button type="button" className="btn close btn-light" onClick={handleClose} aria-label="Close">
                            <span className='text-md' aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <input ref={fileUpload} type="file" id="formFile" className="form-control" onChange={handleFileChange} />
                        {/* <div className='mt-4'>
                            <div className="form-check">
                                <input onChange={(e) => changeMain(e)} className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                <label className="form-check-label" htmlFor="defaultCheck1">
                                   yopiq holatda saqlash
                                </label>
                            </div>
                        </div> */}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Bekor qilish</button>
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Yuklash</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadFileModal;
