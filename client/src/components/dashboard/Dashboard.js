import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profile'

const Dashboard = ({getCurrentProfile,auth,profile}) => {

    useEffect(()=>
    {
        getCurrentProfile();
    },[getCurrentProfile]);

    return (
        <div>
            <p>Dashboard</p>
        </div>
    )
}
const mapStateToProps = state =>
{
 return {
    auth:state.auth,
    profile:state.profile
 }
}
export default connect(mapStateToProps,{getCurrentProfile})(Dashboard)
