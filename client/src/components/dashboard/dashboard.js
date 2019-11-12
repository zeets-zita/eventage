import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, deleteAccount } from "../../actions/authActions";

import { Button } from 'reactstrap';
import './dashboard.css';


class Dashboard extends Component {

  logout = () => {
    const { logoutUser, history } = this.props;
    logoutUser(history);
  };

  onDeleteClick = () => {
    const { deleteAccount, history } =this.props;
    deleteAccount(history)
  }

  render() {
    const { user } = this.props.auth; 
    
    return (
      <div className="dashboard valign-wrapper">
        <div className="dashboard-row">
          <div className="col s12 center-align dashboardCol">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              </h4>
              <p className="flow-text grey-text text-darken-1">
                You are currently logged into {" "}
                <span style={{ fontFamily: "monospace", fontSize: '16px' }}>EVENTAGE</span>  🌸
              </p>
            
            <Button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.logout}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </Button>
            <br />
            <Button
              className="btn btn-danger"
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onDeleteClick.bind(this)}
            >
             Delete My Account 
            </Button>
            </div>
          </div>
        </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { logoutUser, deleteAccount }
)(Dashboard);