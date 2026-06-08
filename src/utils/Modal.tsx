import { useState } from 'react';
import { createPortal } from 'react-dom';
import ControlledForm from '../components/forms/ControlledForm';
import UncontrolledForm from '../components/forms/UncontrolledForm';

function Modal() {
  const [showControlled, setShowControlled] = useState(false);
  const [showUncontrolled, setShowUncontrolled] = useState(false);
  return (
    <>
      <button onClick={() => setShowControlled(true)}>Show Controlled Form</button>
      <button onClick={() => setShowUncontrolled(true)}>Show Uncontrolled Form</button>

      {showControlled &&
        createPortal(<ControlledForm onClose={() => setShowControlled(false)} />, document.body)}

      {showUncontrolled &&
        createPortal(
          <UncontrolledForm onClose={() => setShowUncontrolled(false)} />,
          document.body
        )}
    </>
  );
}

export default Modal;
