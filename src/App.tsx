import './App.css';
import { useState } from 'react';
import Modal from './components/Modal';
import UncontrolledForm from './components/forms/UncontrolledForm';
import ControlledForm from './components/forms/ControlledForm';
import SubmissionCard from './components/Card';
import { useFormStore } from './store/useFormStore';

type FormType = 'uncontrolled' | 'controlled' | null;

function App() {
  const [openedForm, setOpenedForm] = useState<FormType>(null);
  const submissions = useFormStore((s) => s.submissions);

  const close = () => setOpenedForm(null);

  return (
    <div className="main-page">
      <div className="buttons">
        <button type="button" onClick={() => setOpenedForm('uncontrolled')}>
          Open Uncontrolled Form
        </button>
        <button type="button" onClick={() => setOpenedForm('controlled')}>
          Open Controlled Form
        </button>
      </div>

      <div className="cards">
        {submissions.length > 0 &&
          submissions.map((s) => <SubmissionCard key={s.id} submission={s} />)}
      </div>

      <Modal
        isOpen={openedForm !== null}
        onClose={close}
        title={openedForm === 'uncontrolled' ? 'Uncontrolled Form' : 'Open Controlled Form'}
      >
        {openedForm === 'uncontrolled' && <UncontrolledForm onClose={close} />}
        {openedForm === 'controlled' && <ControlledForm onClose={close} />}
      </Modal>
    </div>
  );
}

export default App;
