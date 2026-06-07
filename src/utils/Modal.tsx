import { useState } from 'react';
import { createPortal } from 'react-dom';
import ControlledForm from '../components/forms/ControlledForm';

function Modal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>Show form</button>
      {showModal &&
        createPortal(<ControlledForm onClose={() => setShowModal(false)} />, document.body)}
    </>
  );
}

export default Modal;
