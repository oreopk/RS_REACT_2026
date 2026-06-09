import type { sendData } from '../types/dataTypes';

function SubmissionCard({ submission }: { submission: sendData }) {
  return (
    <div className={`card`}>
      {submission.image && (
        <img src={submission.image} alt={submission.name} className="card-image" />
      )}
      <div className="card-info">
        <h3>{submission.name}</h3>
        <p>Age: {submission.age}</p>
        <p>Email: {submission.email}</p>
        <p>Gender: {submission.gender}</p>
        <p>Country: {submission.country}</p>
      </div>
    </div>
  );
}

export default SubmissionCard;
