import { useModals } from "../../context/modalcontext";
import { useFetch } from "../../hooks/fetchData";

const FileContents = ({ file, clear, setSelectedDocument, setSelecteditem }) => {
    const { data } = useFetch('')
    const { openModal } = useModals();

    return (
        <div>
            {file.documents && file.documents.length > 0 ? (
                <ul className="list-group">
                    {file.documents.map((child) => (
                        <li
                            key={child.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            style={{ cursor: 'pointer' }} // Ko'rsatkichni qo'shimcha sifatida o'zgartiramiz
                        >
                            <i className="fa-solid fa-file fa-1x"></i>
                            <p className="mb-0 hover-underline" onClick={() => setSelectedDocument(child)}>{child.title}</p>

                            <p className="mb-0">{child.created_at}</p>
                            <p className="mb-0">{child.permission}</p>
                            <span className="d-flex" style={{ width: 100 }}>
                                {/* Dropdown Trigger (Three Dots Icon) */}
                                <div className="dropdown">
                                    <button
                                        className="btn btn-link d-flex align-items-centermb-0 "
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-bs-toggle="dropdown"
                                        style={{ textDecoration: 'none' }}
                                        aria-expanded="false">
                                        {/* 3 Dots Icon */}
                                        <i className="fa-solid fa-ellipsis-vertical" style={{ fontSize: 20 }}></i>
                                    </button>

                                    {/* Dropdown Menu */}
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                                        {/* Edit option */}
                                        <li>
                                            <a className="dropdown-item" href="#" onClick={() => {
                                                child.documentType = 'documentEdit'
                                                setSelecteditem(child);
                                                openModal('showDocumentModal')
                                            }}>
                                                <i className="fa-solid fa-pen-to-square text-warning" style={{ fontSize: 20 }}></i> Edit
                                            </a>
                                        </li>

                                        {/* Delete option */}
                                        <li>
                                            <a className="dropdown-item" href="#" onClick={() => {
                                                child.documentType = 'documentDelete'
                                                setSelecteditem(child);
                                                openModal('showDeleteModal')
                                            }}>
                                                <i className="fa-solid fa-trash text-danger" style={{ fontSize: 20 }}></i> Delete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p></p>
            )}
        </div>
    );
};

export default FileContents;
