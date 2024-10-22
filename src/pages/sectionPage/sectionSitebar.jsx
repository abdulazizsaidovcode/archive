import React, { useState } from 'react';

const Sidebar = ({ folders, onFolderSelect, selectedFolder }) => {
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
            <div key={folder.id} className={`accordion-item  `}>
                <h2 className="accordion-header" id={`heading-${folder.id}`}>
                    <div style={{ paddingRight: 10 }} className={`d-flex align-items-center justify-content-between  ${selectedFolder && selectedFolder.id === folder.id ? 'bg-primary' : ''}`}>
                        {/* Folderni tanlash tugmasi */}
                        <button
                            onClick={() => onFolderSelect(folder)}
                            className={`accordion-button folder-select-btn ${selectedFolder && selectedFolder.id === folder.id ? 'bg-primary text-white' : 'text-dark'}`}
                            type="button"
                        >
                            {folder.name}
                        </button>
                        {/* Faqat icon accordionni ochib-yopishi uchun */}
                        <span
                            onClick={() => changeOpen(folder.id)}
                            className="border-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse-${folder.id}`}
                            aria-expanded="false"
                            aria-controls={`collapse-${folder.id}`}
                        >
                            {/* `aria-expanded` orqali iconni o'zgartirish */}
                            <i className={`fa ${isOpen === folder.id ? 'fa-chevron-up' : 'fa-chevron-down'} ${selectedFolder && selectedFolder.id === folder.id ? 'text-white' : 'text-dark'}`}></i>
                        </span>
                    </div>
                </h2>
                <div
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
                </div>
            </div>
        ));
    };

    return (
        <div className="accordion" id="accordionExample">
            {renderFolders(folders)}
        </div>
    );
};

export default Sidebar;
