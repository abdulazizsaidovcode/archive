import { handleDownloadFolder } from "../../components/zip";
import { apirl, document_file_url } from "../../helpers/urls";
import { useFetch } from "../../hooks/fetchData";
import { getFileName } from "../../hooks/truncateText";
import '../../styles/filePopUp.css'

const DocumentFileContents = ({ file, openModal }) => {
    const { data, loading } = useFetch(document_file_url)
    if (loading) return 'Document is loading ...'

    return (
        <div className="container">
            <ul className="list-group">
                <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    style={{ cursor: 'pointer' }} // Ko'rsatkichni qo'shimcha sifatida o'zgartiramiz
                >
                    <i class="fa-solid fa-file fa-1x"></i>
                    <p className="mb-0">{file.title}</p>
                    <p className="mb-0">{file.created_at}</p>
                    <p className="mb-0">{file.permission}</p>
                    <p onClick={() => handleDownloadFolder(file.files)} className="d-flex mb-0" style={{ width: 20 }}>
                        <i style={{ fontSize: 20 }} class="fa-solid fa-download text-dark"></i>
                    </p>
                </li>
            </ul>
            <div className="row">
                {(data && data.results && data.results.length > 0) ? (
                    data.results.filter((child) => child.document === file.id).length > 0 ? (
                        data.results
                            .filter((child) => child.document === file.id)
                            .map((child) => (
                                <a href={new URL(child.file)} target="blank" className="col-md-3 mt-4" key={child.id}>
                                    <div className="card shadow-sm h-100">
                                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                            <div className="section-icon mb-3">
                                                <i class="fa-regular fa-file-lines fa-2x"></i>
                                            </div>
                                            <div className="file-container">
                                                <p className="file-name">
                                                    <p className="text-center">{getFileName(child.file)}</p>
                                                    <span className="tooltipp">{decodeURIComponent(child.file.split('/').pop())}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            ))
                    ) : (
                        <p>Bu fayl identifikatori uchun hech qanday hujjat topilmadi...</p>
                    )
                ) : (
                    <p>Fayllar mavjud emas yoki yuklanmoqda... </p>
                )}
                <br />
                <div onClick={openModal} className="col-md-3 mt-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <div className="section-icon text-center">
                                <i className="fa fa-plus fa-2x"></i>
                                <h6 className="text-canter p">File yuklash</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default DocumentFileContents;
