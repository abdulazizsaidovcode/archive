import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const AddFolderModal = ({ show, handleClose, onSave, setmainFolder }) => {
  const [folderName, setFolderName] = useState('');
  const input = useRef()

  const handleSave = () => {
    if (folderName.trim()) {
      onSave(folderName); // Yangi folder nomini yuboramiz
      setFolderName(''); // Textni tozalash
      handleClose(); // Modalni yopamiz
    } else {
      toast.warning("please fill all filds");
      if(input.current.value.trim() == '') input.current.style.borderColor = 'red'
    }
  };
  // main sifatida folderni yuklashni yoqib qoyadi
  const changeMain = (e) => {
    setmainFolder(e.target.checked)
  }

  return (
    <div className={`modal fade-up ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden={!show}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addFolderModalLabel">Yangi Papka Qo'shish</h5>
            <button type="button" className="btn close btn-light" onClick={handleClose} aria-label="Close">
              <span className='text-md' aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">


              <div>
                <label htmlFor="folderName">Papka Nomi</label>
                <input
                  ref={input}
                  type="text"
                  className="form-control"
                  id="folderName"
                  placeholder="Papka nomini kiriting"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                />
              </div>
              <div className='mt-4'>
                <div class="form-check">
                  <input onChange={(e) => changeMain(e)} class="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                  <label class="form-check-label" for="defaultCheck1">
                    main folder sifatida belgilash
                  </label>
                </div>
              </div>
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

export default AddFolderModal;
