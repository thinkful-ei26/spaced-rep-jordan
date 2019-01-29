import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import Feedback from './feedback';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProtectedData());
    }

    render() {
        return (
            <div className="dashboard">
                {/* <div className="dashboard-username">
                    Username: {this.props.username}
                </div> */}
                <div className="dashboard-name">Hello {this.props.name.toUpperCase()}</div>
                {/* <div className="dashboard-protected-data">
                    Protected data: {this.props.protectedData}
<<<<<<< HEAD
                </div> */}
=======
                </div>
                <Feedback />
>>>>>>> 0c124ec89b794d63cced12f8adbfad9b7875c092
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
