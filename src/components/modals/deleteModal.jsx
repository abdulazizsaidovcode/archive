export const DeletModal = ({ show, handleClose, onSave }) => {
    return (
        <div
            className={`modal fade-up ${show ? 'show' : ''}`}
            style={{ display: show ? 'block' : 'none' }}
            tabIndex="-1"
            id="exampleModalCenter"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            data-bs-keyboard="false"
            aria-hidden={!show}
        >
            <div className="modal-dialog modal-confirm">
                <div className="modal-content">
                    <div className="modal-header pb-0">
                        <p type="button" className="close" onClick={handleClose} aria-label="Close">
                            <span className='text-md' aria-hidden="true">&times;</span>
                        </p>
                    </div>
                    <div className="modal-body pt-0 d-flex flex-column align-items-center">
                        <div onClick={handleClose} className="icon-box">
                            <i className="fa-solid fa-triangle-exclamation"></i>
                        </div>
                        <h4 className="modal-title">Are you sure?</h4>
                    </div>
                    <div className="modal-body">
                        <p>Do you really want to delete these records? This process cannot be undone.</p>
                    </div>
                    <div>
                        <button onClick={() => handleClose()} type="button" className="btn btn-info">Cancel</button>
                        <button onClick={() => {
                            onSave()
                        }} type="button" className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}