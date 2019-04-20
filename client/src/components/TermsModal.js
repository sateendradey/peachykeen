import React, { Component } from 'react';

class TermsModal extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <ReactModal
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
        >
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
      </div>
    );
  }
}

export default TermsModal;
