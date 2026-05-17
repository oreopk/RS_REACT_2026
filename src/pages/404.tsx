import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="page">
      <h1>404</h1>
      <Link to="/">Back to site</Link>
    </div>
  );
}

export default NotFoundPage;
