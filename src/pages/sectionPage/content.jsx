import { handleDownloadFolder } from "../../components/zip";

const FolderContents = ({ folder, onFolderSelect }) => {
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
              <span className="d-flex " style={{ width: 20 }} onClick={() => handleDownloadFolder(folder)}>
                <i style={{ fontSize: 20 }} class="fa-solid fa-download text-dark"></i>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No subfolders or files.</p>
      )}
    </div>
  );
};

export default FolderContents;
