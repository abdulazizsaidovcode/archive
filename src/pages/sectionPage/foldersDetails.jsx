import React, { useEffect, useState } from "react";
import FolderContents from "./content";
import AddFolderModal from "../../components/modals/addFolderModal";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import UploadFileModal from "../../components/modals/fileuploadmodal";
import {
  apirl,
  document_file_url,
  document_type_url,
  document_url,
  folder_Url,
} from "../../helpers/urls";
import FileContents from "./document";
import { toast } from "react-toastify";
import FolderDetailSidebar from "../../components/sitebar/folderDetailSitebar";
import AddDocumentModal from "../../components/modals/addDocumentModal";
import { DeleteData, PostData, PutData, useFetch } from "../../hooks/fetchData";
import DocumentFileContents from "./documentFile";
import Pagination from "../../components/pagenation";
import { DeletModal } from "../../components/modals/deleteModal";
import { config } from "../../helpers/token";
import EditFolderModal from "../../components/modals/editFolderModal";
import MoveFolder from "../../components/move/folder";
import { useModals } from "../../context/modalcontext";
import { useAuthErrorHandler } from "../../hooks/error.hadler";

function Addsections() {
  // ----------- error handler ----------- //
  const handleAuthError = useAuthErrorHandler();
  // ----------- modals ----------- //
  const { openModal, closeModal, modals } = useModals();

  // seved data
  const [datas, setDatas] = useState([]);

  const [selectedItem, setSelecteditem] = useState("");
  const [moveFolder, setMoveFolder] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState("");
  const [expandedFolders, setExpandedFolders] = useState([]);
  const [mainFolder, setmainFolder] = useState(false);

  // paginations
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const { folderId } = useParams();
  const navigate = useNavigate();

  const { data: docimentType } = useFetch(document_type_url);
  const { data: allFolders } = useFetch(apirl + `v1/folder/?page=${currentPage}`, config);

  useEffect(() => {
    fetchSections();
  }, [folderId, currentPage, pageSize]);
  

  // folder va documentni kuzatadi
  useEffect(() => {
    // Recursive function to find a folder or document by id in a nested structure
    const findInTree = (folders, id) => {
      for (let folder of folders) {
        // Check if we found the folder
        if (folder.id === id) {
          return { folder }; // Return the folder if found
        }

        // If it's not the folder, check documents inside this folder
        if (folder.documents) {
          const foundDocument = folder.documents.find((doc) => doc.id === id);
          if (foundDocument) {
            return { folder, document: foundDocument }; // Return both the folder and the document
          }
        }

        // If the folder has children, recurse into the children
        if (folder.children) {
          const foundInChildren = findInTree(folder.children, id);
          if (foundInChildren) {
            return foundInChildren; // Return found folder/document from children
          }
        }
      }
      return null; // Return null if nothing is found
    };

    // Check if data has changed and folderId is valid
    if (datas.length > 0 && selectedFolder && selectedFolder.id) {
      const found = findInTree(datas, parseInt(selectedFolder.id));

      if (found) {
        // If we found the folder, update selectedFolder state
        setSelectedFolder(found.folder);

        // If we also found a document, update selectedDocument state
        if (selectedDocument && found.folder.documents) {
          setSelectedDocument(
            found.folder.documents.find((doc) => doc.id === selectedDocument.id)
          ); // Update selectedDocument state
        }
      }
    }
  }, [datas, folderId, selectedFolder?.id]);

  const fetchSections = async () => {
    try {
      let token = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      };
      const response = await axios.get(
        apirl + `v1/folder/?page=${currentPage}`,
        token
      );
      console.log(response);
      
      const newData = response.data;

      setTotalPages(Math.ceil(newData.count / pageSize));

      // If folderId is provided, find the selected folder within the new data
      if (folderId && folderId !== "All") {
        const foundFolder = newData.results.find(
          (folder) => folder.id == folderId
        );
        if (foundFolder) {
          setSelectedFolder(foundFolder);
          setDatas(newData.results);
        }
      } else {
        setDatas(newData.results);
      }
    } catch (error) {
      handleAuthError(error);
      console.error("Error fetching sections:", error);
    }
  };

  const handleAddFolder = async (folderName) => {
    try {
      const token = localStorage.getItem("access_token");
      const newFolder = {
        name: folderName,
        parent: mainFolder ? null : selectedFolder ? selectedFolder.id : null,
      };

      if (!mainFolder && !selectedFolder) {
        toast.warning(
          "Avval biron bir folderni tanlang !  yoki main folderni sifatiga o'rnatishni tanlang !"
        );
      }
      if (mainFolder || selectedFolder) {
        const response = await axios.post(apirl + "/v1/folder/", newFolder, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchSections(); // Refresh data from server
        closeModal("showModal");
        setmainFolder(false);
      }
    } catch (error) {
      toast.error("Error creating folder");
    }
  };

  // Handle back navigation function
  const handleBack = () => {
    if (selectedFolder.parent == null && selectedFolder.id == folderId) {
      setSelectedFolder(null);
    }
    if (selectedDocument) {
      setSelectedDocument("");
    } else {
      if (selectedFolder) {
        const parentFolder = findParentFolder(datas, selectedFolder.id);
        if (parentFolder) {
          setSelectedFolder(parentFolder);
        }
      }
    }
  };

  // Function to find the parent folder of the selected folder
  const findParentFolder = (folders, folderId) => {
    for (const folder of folders) {
      if (
        folder.children &&
        folder.children.some((child) => child.id === folderId)
      ) {
        return folder;
      }
      if (folder.children) {
        const parent = findParentFolder(folder.children, folderId);
        if (parent) return parent;
      }
    }
    return null;
  };

  // Function to update the cache with new folder or document data

  const handleFolderSelect = (folder) => {
    if (selectedFolder) {
      if (folder.id == selectedFolder.id) {
        setSelectedFolder(null);
      } else {
        setSelectedFolder(folder);
        setSelectedDocument("");
      }
    } else {
      setSelectedFolder(folder);
      setSelectedDocument("");
    }
  };

  // Folder Expansion toggler
  const toggleFolderExpand = (folderId) => {
    setExpandedFolders((prev) =>
      prev.includes(folderId)
        ? prev.filter((id) => id !== folderId)
        : [...prev, folderId]
    );
  };

  const isFolderExpanded = (folderId) => {
    return expandedFolders.includes(folderId);
  };

  // Navigatsiya yo'lini yaxshilash
  const buildBreadcrumb = (folder, folders) => {
    const breadcrumb = [];

    const findPath = (currentFolder) => {
      const parent = findParentFolder(folders, currentFolder.id); // Ota papkani qidiramiz
      if (parent) {
        findPath(parent); // Ota papkaga qaytamiz va rekursiv ravishda davom etamiz
      }
      breadcrumb.push(currentFolder.name); // Har bir papka nomini qo'shamiz
    };
    findPath(folder); // Tanlangan papkadan boshlaymiz
    return breadcrumb.join(" / "); // Qator qilib chiqarish
  };

  const handleFileUpload = async (selectedFile) => {
    try {
      const token = localStorage.getItem("access_token");
      const formData = new FormData();

      formData.append("file", selectedFile);
      formData.append("document", selectedDocument.id);
      console.log(selectedDocument.id, 1244);

      // APIga faylni yuklash
      const response = await axios.post(document_file_url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Fayl yuklandi:", response.data);
      closeModal("showFileModal");
      fetchSections();
      // setSelecteditem("");
    } catch (error) {
      toast.error("Faylni yuklashda xato yuz berdi:", error);
    }
  };

  const handleDocumentUpload = async (selectedFile) => {
    // APIga faylni yuklash
    let newData = {
      ...selectedFile,
      created_at: "2024-10-28",
      folder: selectedFolder.id,
      owner: 1,
    };

    try {
      await PostData(document_url, newData);
      closeModal("showFileModal");
      fetchSections();
    } catch (error) {
      console.error("Failed to add document:", error);
    }
  };
  const deleteFolder = async () => {
    try {
      await DeleteData(folder_Url, selectedItem.id);
      fetchSections();
      closeModal("showDeleteModal");
    } catch (error) {
      console.error("Failed to delete folder:", error);
    }
  };
  //  ---------- folder edit qilish -----------
  const putFolderDocument = async (text) => {
    const newFolder = {
      name: text ? text : selectedItem.name,
      parent: mainFolder ? null : selectedFolder.id,
    };

    try {
      await PutData(folder_Url, newFolder, selectedItem.id);
      fetchSections();
      closeModal("showEditModal");
    } catch (error) {
      console.error("Failed to update folder document:", error);
    }
  };

  // ----------  folder kochirish -------------
  const moveFolderFunction = async () => {
    const newFolder = {
      name: moveFolder.name,
      parent: mainFolder ? null : selectedFolder.id,
    };
    if (selectedFolder.documents.length > 0) {
      toast.warning("Folderda kochira olmaysiz");
    } else {
      try {
        await PutData(folder_Url, newFolder, moveFolder.id);
        fetchSections();
        closeModal("showEditModal");
        setMoveFolder(null);
      } catch (error) {
        console.error("Failed to move folder:", error);
      }
    }
  };

  const documentEdit = async (selectedFile) => {
    let newData = {
      ...selectedFile,
      created_at: selectedItem.created_at,
      folder: selectedFolder.id,
      owner: 1,
    };

    try {
      await PutData(document_url, newData, selectedItem.id);
      fetchSections();
      closeModal("showEditModal");
    } catch (error) {
      console.error("Failed to update document:", error);
    }
  };

  const deleteDocument = async () => {
    try {
      await DeleteData(document_url, selectedItem.id);
      fetchSections();
      closeModal("showDeleteModal");
    } catch (error) {
      console.error("Failed to delete document:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-md-3 border-right h-screen pt-5"
          style={{ height: "90vh" }}
        >
          <h2>Main folders</h2>
          <FolderDetailSidebar
            folders={datas}
            onFolderSelect={handleFolderSelect}
            selectedFolder={selectedFolder}
            onToggleExpand={toggleFolderExpand}
            isExpanded={isFolderExpanded}
          />
          {datas && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              setPageSize={setPageSize}
              onPageChange={setCurrentPage}
            />
          )}
        </div>

        <div className="col-md-9 w-100 pt-5">
          <div className="d-flex align-items-center w-100 mb-3">
            <i
              className="fa-solid fa-arrow-left mr-3 text-dark fa-1x"
              onClick={handleBack}
            ></i>
            <div className="d-flex justify-content-between align-items-end w-100">
              <div className="d-flex align-items-end">
                <h3 className="h4 mb-0"> Navigatsiya:</h3>
                <p className="mb-0 ml-2">
                  {" "}
                  {selectedFolder
                    ? buildBreadcrumb(selectedFolder, datas)
                    : "No folder selected"}
                </p>
              </div>
              <div>
                {!selectedDocument &&
                  selectedFolder &&
                  !selectedFolder.children && (
                    <button
                      className="btn btn-sm btn-success mr-2"
                      onClick={() => openModal("showDocumentModal")}
                    >
                      Add file <i className="fa-solid fa-plus text-white"></i>
                    </button>
                  )}
                {((selectedFolder && !selectedFolder.documents.length) ||
                  selectedFolder == null) && (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => openModal("showModal")}
                  >
                    Add Folder <i className="fa-solid fa-plus text-white"></i>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* vvvvvvvvvvvvvvvvvv move folder vvvvvvvvvvvvvvvvvv */}
          {moveFolder && (
            <MoveFolder
              folder={moveFolder}
              parentFolder={selectedFolder}
              canselmoveFolder={() => setMoveFolder(null)}
              moveFolder={moveFolderFunction}
            />
          )}
          {/*  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}

          {/* vvvvvvvvvv folder component vvvvvvvvvv */}
          {selectedFolder &&
          (!selectedFolder.documents.length || selectedFolder) ? (
            <FolderContents
              folder={selectedFolder}
              onFolderSelect={handleFolderSelect}
              setSelecteditem={setSelecteditem}
              setMoveFolder={setMoveFolder}
            />
          ) : (
            !selectedDocument && <p>Avval biron bir folderni tanlang !</p>
          )}
          {/*  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}

          {/* vvvvvvvvvv document component vvvvvvvvvv */}
          {!selectedDocument && selectedFolder && selectedFolder.documents && (
            <FileContents
              file={selectedFolder}
              clear={""}
              setSelectedDocument={setSelectedDocument}
              setSelecteditem={setSelecteditem}
            />
          )}
          {/*  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}

          {/* vvvvvvvvvv file component vvvvvvvvvv */}
          {selectedDocument && <DocumentFileContents file={selectedDocument} />}
          {/*  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}

          {/* vvvvvvvvvv check folder is selected vvvvvv */}
          {!selectedFolder?.children && !selectedFolder?.documents?.length && (
            <p>file yoki folder topilmadi !</p>
          )}
          {/*  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
        </div>
      </div>

      {/* --------- modals ---------- */}
      <AddDocumentModal
        show={modals.showDocumentModal}
        handleClose={() => closeModal("showDocumentModal")}
        onSave={(data) => {
          if (selectedItem.documentType == "documentEdit") {
            documentEdit(data);
          } else {
            handleDocumentUpload(data);
          }
        }}
        documentTypes={docimentType}
      />
      <UploadFileModal
        show={modals.showFileModal}
        handleClose={() => closeModal("showFileModal")}
        onSave={handleFileUpload}
      />
      <AddFolderModal
        show={modals.showModal}
        currentFolder={selectedFolder}
        handleClose={() => closeModal("showModal")}
        onSave={handleAddFolder}
        setmainFolder={setmainFolder}
      />
      <EditFolderModal
        show={modals.showEditFolderModal}
        currentFolder={selectedFolder}
        handleClose={() => closeModal("showEditFolderModal")}
        onSave={putFolderDocument}
        setmainFolder={setmainFolder}
      />
      <DeletModal
        show={modals.showDeleteModal}
        handleClose={() => closeModal("showDeleteModal")}
        onSave={() => {
          if (selectedItem.documentType == "documentDelete") {
            deleteDocument();
          } else {
            deleteFolder();
          }
        }}
      />
    </div>
  );
}

export default Addsections;
