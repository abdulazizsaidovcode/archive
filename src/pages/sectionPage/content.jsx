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
              <p className="hover-underline" style={{ marginBottom: 0 }} onClick={() => onFolderSelect(child)}>{child.name} </p>
              <span className="d-flex" style={{ width: 20 }} onClick={() => handleDownloadFolder(folder)}>
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 122.88 110.9"
                  style={{ enableBackground: 'new 0 0 122.88 110.9' }}
                  xmlSpace="preserve"
                >
                  <g>
                    <path
                      className="st0"
                      d="M13.09,35.65h30.58V23.2l34.49,0v12.45l31.47,0L61.39,82.58L13.09,35.65L13.09,35.65z M61.44,97.88l47.51-0.14 l4.54-21.51l9.38,0.31v34.36L0,110.9V76.55l9.39-0.31l4.54,21.51L61.44,97.88L61.44,97.88L61.44,97.88z M43.67,0h34.49v4.62H43.67 V0L43.67,0z M43.67,9.32h34.49v9.44H43.67V9.32L43.67,9.32z"
                    />
                  </g>
                </svg>              </span>
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
