
import React from 'react';
import { Link } from 'react-router-dom';

const FooterEnd: React.FC = () => {
  return (
    <div className="container-fluid py-4 px-sm-3 px-md-5" style={{ background: '#111111' }}>
      <p className="m-0 text-center">&copy; <Link to="/">Online News</Link>. All Rights Reserved.</p>
    </div>
  );
};

export default FooterEnd;
