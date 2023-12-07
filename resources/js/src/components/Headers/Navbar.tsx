import React from 'react';
import AuthModal from '../../common/Modal/Auth/AuthModal';

const Navbar: React.FC = () => {

  return (
    <>
        <nav className="navbar main_nav">
          <div className="button_wrap">
            <AuthModal />
          </div>
        </nav>
    </>
  );
};

export default Navbar;
