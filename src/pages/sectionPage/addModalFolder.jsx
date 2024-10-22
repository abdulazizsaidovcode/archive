import React, { useState } from 'react';

const AddFolderModal = ({ show, handleClose, onSave }) => {
  const [folderName, setFolderName] = useState('');

  const handleSave = () => {
    if (folderName.trim()) {
      onSave(folderName); // Yangi folder nomini yuboramiz
      setFolderName(''); // Textni tozalash
      handleClose(); // Modalni yopamiz
    }
  };

  return (
    <div className={`modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="addFolderModalLabel" aria-hidden={!show}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addFolderModalLabel">Yangi Papka Qo'shish</h5>
            <button type="button" className="close" onClick={handleClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="folderName">Papka Nomi</label>
              <input
                type="text"
                className="form-control"
                id="folderName"
                placeholder="Papka nomini kiriting"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Yopish</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Saqlash</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFolderModal;
