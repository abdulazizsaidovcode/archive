import { handleDownloadFolder } from "../../components/zip";

const FolderContents = ({ folder, onFolderSelect, setShowDeleteModal,setSelecteditem }) => {
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
              <i class="fa-solid fa-folder fa-1x"></i>
              <p className="hover-underline" style={{ marginBottom: 0 }} onClick={() => onFolderSelect(child)}>{child.name} </p>
              <p> </p>
              <p> </p>
              <p> </p>
              <p> </p>
              <p> </p>
              <span className="d-flex " style={{ width: 100 }} >
                <i onClick={() => handleDownloadFolder(folder)} style={{ fontSize: 20 }} class="fa-solid fa-download text-dark"></i>
                <i style={{ fontSize: 20 }} class="fa-solid fa-pen-to-square text-warning ml-3"></i>
                <i onClick={() => {
                  setSelecteditem(child);
                  setShowDeleteModal()
                }} style={{ fontSize: 20 }} class="fa-solid fa-trash text-danger ml-3"></i>
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
