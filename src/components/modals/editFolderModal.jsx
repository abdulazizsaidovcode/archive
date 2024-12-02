import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const EditFolderModal = ({ show, handleClose, currentFolder, onSave, setmainFolder }) => {
  const [folderName, setFolderName] = useState('');
  const [mainFolders, setmainFolders] = useState('');

  const input = useRef()

  const handleSave = () => {
    if (folderName.trim()) {
      onSave(folderName); // Yangi folder nomini yuboramiz
      setFolderName(''); // Textni tozalash
      handleClose(); // Modalni yopamiz
    } else {
      toast.warning("please fill all filds");
      if (input.current.value.trim() == '') input.current.style.borderColor = 'red'
    }
  };
  // main sifatida folderni yuklashni yoqib qoyadi
  const changeMain = (e) => {
    setmainFolder(e.target.checked)
    setmainFolders(e.target.checked)
  }

  return (
    <div className={`modal fade-up ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden={!show}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addFolderModalLabel">Yangi Papka Qo'shish</h5>
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
                <div className="form-check">
                  <input onChange={(e) => changeMain(e)} className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    main folder sifatida belgilash
                  </label>
                </div>
              </div>
              {!mainFolders &&
                <div className='d-flex align-items-end mt-3'>
                  <i className="fa-solid fa-folder fa-2x mr-1"></i>
                  <i className="fa-solid fa-arrow-left fa-1x mr-3 text-success"></i>
                  <div className='d-flex align-items-end'>
                    <p className=" mb-0">{currentFolder ? currentFolder.name : 'folder - tanleng'} </p>
                    {currentFolder && <p className='mb-0 ml-2'>folderi ichiga yaratmoqdasiz !</p>}
                  </div>
                </div>
              }
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

export default EditFolderModal;
