import React, { useState } from 'react';

const FolderDetailSidebar = ({ folders, onFolderSelect, selectedFolder }) => {
    const [isOpen, setIsOpen] = useState('')

    function changeOpen(id) {
        if (isOpen == id) {
            setIsOpen('')
        } else {
            setIsOpen(id)
        }
    }
    const renderFolders = (folders) => {
        return folders.map((folder) => (
            <div onClick={() => onFolderSelect(folder)} key={folder.id} className={`accordion-item`}>
                <h2 className="accordion-header" id={`heading-${folder.id}`}>
                    <div style={{ paddingRight: 10 }} className={`d-flex align-items-center justify-content-between p-2 rounded  ${selectedFolder && selectedFolder.id === folder.id ? 'bg-primary' : 'bg-gray-light'}`}>
                        {/* Folderni tanlash tugmasi */}
                        <p
                            
                            className={`accordion-button folder-select-btn mb-0 h6 ${selectedFolder && selectedFolder.id === folder.id ? 'bg-primary text-white' : 'text-dark'}`}
                            type="button"
                        >
                            {folder.name}
                        </p>
                        {/* Faqat icon accordionni ochib-yopishi uchun */}
                        <span
                            onClick={() => changeOpen(folder.id)}
                            className="d-flex"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse-${folder.id}`}
                            aria-expanded="false"
                            aria-controls={`collapse-${folder.id}`}
                        >
                            {/* `aria-expanded` orqali iconni o'zgartirish */}
                            <i className={`fa fa-chevron-right ${selectedFolder && selectedFolder.id === folder.id ? 'text-white' : 'text-dark'}`}></i>
                        </span>
                    </div>
                </h2>
                {/* --------- recursiya uchun chillarni ham qayda ishlab chiqorib beradi -------- */}
                {/* <div
                    id={`collapse-${folder.id}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading-${folder.id}`}
                >
                    <div className="accordion-body">
                        {folder.children.length > 0 ? (
                            <div className="accordion" id={`accordion-${folder.id}`}>
                                {renderFolders(folder.children)}
                            </div>
                        ) : (
                            'No subfolders'
                        )}
                    </div>
                </div> */}
            </div>
        ));
    };

    return (
        <div className="accordion" id="accordionExample">
            {folders && folders.length > 0 ? renderFolders(folders) : "no Folders! 😑"}
        </div>
    );
};

export default FolderDetailSidebar;
