import React from 'react'; 
import { Link } from 'react-router-dom';

import './landingPage.css';

class Landing extends React.Component {
    render() {
        return (
          <div className='landing-page'>
            <h1 className='heading'>EVENTage</h1>
                <div className='links'>
                <Link className='authButton' to="/login" >
                  LOGIN
                </Link>
                <div className="vl"></div>
                <Link className='authButton' to="/register">
                  REGISTER
                </Link>
                </div>
            </div>
        )
    }
}

export default Landing