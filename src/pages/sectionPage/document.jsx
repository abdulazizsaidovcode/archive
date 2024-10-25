import { apirl } from "../../helpers/urls";

const FileContents = ({ file }) => {
    console.log(file, 'aaaa');
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
                            <i class="fa-solid fa-file fa-1x"></i>
                            <p className="mb-0">{child.title}</p>
                            <p className="mb-0">{child.created_at}</p>
                            <p className="mb-0">{child.permission}</p>
                            <a target="blank" href={`${apirl + child.file}`} className="d-flex " style={{ width: 20 }}>
                                <i style={{ fontSize: 20 }} class="fa-solid fa-download text-dark"></i>
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No subfolders or files.</p>
            )}
        </div>
    );
};

export default FileContents;
