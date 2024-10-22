import React from 'react';

const Sidebar = ({ folders, onFolderSelect, selectedFolder }) => {
    const renderFolders = (folders) => {
        return folders.map((folder) => (
            <div key={folder.id} className="accordion-item">
                <h2 className="accordion-header" id={`heading-${folder.id}`}>
                    <button
                        onClick={() => onFolderSelect(folder)}
                        className={`accordion-button collapsed ${selectedFolder  && selectedFolder.id === folder.id ? 'active' : ''}`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${folder.id}`}
                        aria-expanded="false"
                        aria-controls={`collapse-${folder.id}`}
                    >
                        {folder.name}
                    </button>
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
