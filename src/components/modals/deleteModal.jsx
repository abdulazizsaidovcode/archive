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
            <div class="modal-dialog modal-confirm">
                <div class="modal-content">
                    <div class="modal-header pb-0">
                        <p type="button" className="close" onClick={handleClose} aria-label="Close">
                            <span className='text-md' aria-hidden="true">&times;</span>
                        </p>
                    </div>
                    <div class="modal-body pt-0 d-flex flex-column align-items-center">
                        <div onClick={handleClose} class="icon-box">
                            <i class="fa-solid fa-triangle-exclamation"></i>
                        </div>
                        <h4 class="modal-title">Are you sure?</h4>
                    </div>
                    <div class="modal-body">
                        <p>Do you really want to delete these records? This process cannot be undone.</p>
                    </div>
                    <div>
                        <button onClick={() => handleClose()} type="button" class="btn btn-info">Cancel</button>
                        <button onClick={() => {
                            onSave()
                        }} type="button" class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}