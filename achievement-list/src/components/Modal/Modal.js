import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isShowing, hide, deleteList, listId}) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <p>
          Are you sure you want to delete this list FOREVER? 
        </p>
		<button onClick={deleteList}>Delete Forever</button> 
		<button onClick={hide}>Go Back</button>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;