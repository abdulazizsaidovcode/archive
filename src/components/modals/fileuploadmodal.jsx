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

        <div className={`modal fade-up ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Fayl yuklash</h5>
                        <button type="button" className="btn close btn-light" onClick={handleClose} aria-label="Close">
                            <span className='text-md' aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <input ref={fileUpload} type="file" id="formFile" className="form-control" onChange={handleFileChange} />
                        {/* <div className='mt-4'>
                            <div class="form-check">
                                <input onChange={(e) => changeMain(e)} class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                <label class="form-check-label" for="defaultCheck1">
                                   yopiq holatda saqlash
                                </label>
                            </div>
                        </div> */}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onClick={handleClose}>Bekor qilish</button>
                        <button type="button" class="btn btn-primary" onClick={handleSave}>Yuklash</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadFileModal;
