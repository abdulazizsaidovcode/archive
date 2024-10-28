import { apirl, document_file_url } from "../../helpers/urls";
import { useFetch } from "../../hooks/fetchData";

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
                    <a target="blank" href={`${apirl + file.file}`} className="d-flex " style={{ width: 20 }}>
                        <i style={{ fontSize: 20 }} class="fa-solid fa-download text-dark"></i>
                    </a>
                </li>
            </ul>
            <div className="row">
                {(data && data.results && data.results.length > 0) ? (
                    data.results.filter((child) => child.document === file.id).length > 0 ? (
                        data.results
                            .filter((child) => child.document === file.id)
                            .map((child) => (
                                <div className="col-md-3 mt-4" key={child.id}>
                                    <div className="card shadow-sm h-100">
                                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                            <div className="section-icon mb-3">
                                                <i className="fa fa-folder-open fa-2x"></i>
                                            </div>
                                            <h5 className="card-title text-center">{child.name}</h5>
                                        </div>
                                    </div>
                                </div>
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
