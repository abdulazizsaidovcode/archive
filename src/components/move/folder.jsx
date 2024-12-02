
const MoveFolder = ({ folder, parentFolder, canselmoveFolder, moveFolder }) => {
    console.log(folder);
    console.log(parentFolder);

    return (
        <div className="border-bottom border-top mb-3 py-3">
            <div className="d-flex justify-content-between w-100 align-items-center mb-4">
                <ul className="list-group w-100 mr-2">
                    <li
                        className="list-group-item d-flex justify-content-between align-items-center py-1 "
                        style={{ cursor: 'pointer' }} // Ko'rsatkichni qo'shimcha sifatida o'zgartiramiz
                    >
                        <i className="fa-solid fa-folder fa-1x"></i>
                        <p className="mb-0 p-1"> {folder.name}</p>
                        <p className="hover-underline" style={{ marginBottom: 0 }}> </p>
                        <p> </p>
                        <p> </p>
                        <p> </p>
                        <p> </p>
                        <p></p>
                    </li>
                </ul>
                <button
                    className="btn bg-danger text-white"
                    onClick={() => canselmoveFolder()}
                >
                    cancel
                </button>
            </div>
            <div>
                <div className="d-flex justify-content-between w-100 align-items-center">
                    <h5>siz ko'chirmoqchi bolgan folder nomi: {parentFolder.name}</h5>
                    <button className="btn bg-primary text-white" onClick={() => moveFolder()}> bu folderga ko'chirish</button>
                </div>
            </div>
        </div>
    );
};

export default MoveFolder;
