import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>404</h1>
      <p>Against Humanity, we couldn't find that page</p>
      <p>Draw another card and try again</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default NotFound;