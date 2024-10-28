import { useEffect, useState } from "react";
import { apirl } from "../../helpers/urls";
import { useFetch } from "../../hooks/fetchData";
import DocumentFileContents from "./documentFile";

const FileContents = ({ file, clear, setSelectedDocument}) => {
    const { data } = useFetch('')


    return (
        <div>
            {file.documents && file.documents.length > 0 ? (
                <ul className="list-group">
                    {file.documents.map((child) => (
                        <li
                            onClick={() => setSelectedDocument(child)}
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
                <p></p>
            )}
        </div>
    );
};

export default FileContents;
