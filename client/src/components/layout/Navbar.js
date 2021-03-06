import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth';

 const Navbar = ({auth,logout}) => {
   const authLinks= (
    <ul>
    <li><Link to="/profiles">Developers</Link> </li>
    <li><Link to="/dashboard">Dashboard</Link> </li>
    <li> <a href="#!" onClick={logout}>Logout</a></li>
  </ul>
   );
   const guestLinks = (
    <ul>
    <li><Link to="/profiles">Developers</Link> </li>
    <li><Link to="/register">Register</Link> </li>
    <li><Link to="/login">Login</Link> </li>
  </ul>
   );
    return (
        <nav className="navbar bg-dark">
        <h1>
          <Link to="/"><i className="fas fa-code"></i>DevConnector</Link> 
        </h1>
        {auth.isAuthenticated ? authLinks:guestLinks}
        
      </nav>
    )
};
const mapStateToProps = state =>({
  auth:state.auth
  })
export default connect(mapStateToProps,{logout})(Navbar);
