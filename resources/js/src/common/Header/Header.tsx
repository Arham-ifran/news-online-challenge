import React from 'react'
import Navbar from '../../components/Headers/Navbar'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <React.Fragment>
        <div className="masthead">
            <div className="masthead__inner">
              <Link to="/" className="site_logo">
                  <h2><span>ONLINE</span> NEWS</h2>
              </Link>
              <Navbar/>
            </div>
        </div>
      
    
    </React.Fragment>
  )
}

export default Header
