import { handleDownloadFolder } from "../../components/zip";
import { useModals } from "../../context/modalcontext";

const FolderContents = ({ folder, onFolderSelect, setSelecteditem, setMoveFolder }) => {
  const { openModal} = useModals();

  return (
    <div>
      {folder.children && folder.children.length > 0 ? (
        <ul className="list-group">
          {folder.children.map((child) => (
            <li
              key={child.id}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ cursor: 'pointer' }} // Ko'rsatkichni qo'shimcha sifatida o'zgartiramiz
            >
              <i className="fa-solid fa-folder fa-1x"></i>
              <p className="hover-underline " style={{ marginBottom: 0 }} onClick={() => onFolderSelect(child)}>{child.name} </p>
              <p> </p>
              <p> </p>
              <p> </p>
              <p> </p>
              <p> </p>
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
                    {/* Download option */}
                    <li>
                      <a className="dropdown-item" href="#" onClick={() => setMoveFolder(child)}>
                        <i className="fa-solid fa-turn-up text-dark" style={{ fontSize: 20 }}></i> Move
                      </a>
                    </li>

                    {/* Edit option */}
                    <li>
                      <a className="dropdown-item" href="#" onClick={() => {
                        child.documentType = 'folderEdit'
                        setSelecteditem(child);
                        openModal('showEditFolderModal')
                      }}>
                        <i className="fa-solid fa-pen-to-square text-warning" style={{ fontSize: 20 }}></i> Edit
                      </a>
                    </li>

                    {/* Delete option */}
                    <li>
                      <a className="dropdown-item" href="#" onClick={() => {
                        child.documentType = 'folderDelete'
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

export default FolderContents;
