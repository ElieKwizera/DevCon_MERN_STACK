import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';


const PrivateRoute = ({isAuthenticated,component:Component,...rest}) => (
    <Route {...rest} render = {props => !isAuthenticated ? (<Redirect to="/login" />) : (<Component { ...props } />)} />
)

const mapStateToProps = state =>
{
    return { 
        isAuthenticated:state.auth.isAuthenticated
     };
}
export default connect(mapStateToProps)(PrivateRoute);
