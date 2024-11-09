import React, { createContext, useContext, useState } from 'react';

// Modal context yaratish
const ModalContext = createContext();

export const useModals = () => {
    return useContext(ModalContext); // useModals hook yordamida contextni olish
};

export const ModalProvider = ({ children }) => {
    const [modals, setModals] = useState({
        showModal: false,
        showDocumentModal: false,
        showFileModal: false,
        showDeleteModal: false,
        showEditFolderModal: false,
    });

    // Modalni ochish
    const openModal = (modalName) => {
        console.log('render');
        
        setModals((prevModals) => ({ ...prevModals, [modalName]: true }));
    };

    // Modalni yopish
    const closeModal = (modalName) => {
        setModals((prevModals) => ({ ...prevModals, [modalName]: false }));
    };

    return (
        <ModalContext.Provider value={{ modals, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};
