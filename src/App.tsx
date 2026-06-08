import './App.css';

import { useState } from 'react';
import Modal from './components/Modal';
import UncontrolledForm from './components/forms/UncontrolledForm';
import ControlledForm from './components/forms/ControlledForm';

type FormType = 'uncontrolled' | 'controlled' | null;

function App() {
  const [openedForm, setOpenedForm] = useState<FormType>(null);

  const close = () => setOpenedForm(null);

  return (
    <div className="main-page">
      <div className="buttons">
        <button type="button" onClick={() => setOpenedForm('uncontrolled')}>
          Open Uncontrolled Form
        </button>
        <button type="button" onClick={() => setOpenedForm('controlled')}>
          Open React Hook Form
        </button>
      </div>

      <Modal
        isOpen={openedForm !== null}
        onClose={close}
        title={openedForm === 'uncontrolled' ? 'Uncontrolled Form' : 'React Hook Form'}
      >
        {openedForm === 'uncontrolled' && <UncontrolledForm onClose={close} />}
        {openedForm === 'controlled' && <ControlledForm onClose={close} />}
      </Modal>
    </div>
  );
}

export default App;
