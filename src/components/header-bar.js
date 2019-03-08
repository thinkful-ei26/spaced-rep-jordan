import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import './header-bar.css'

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        let currentUser;
        let logOutButton;

        if (this.props.loggedIn) {

            currentUser = (
                <span className="current-user">Greetings, <span className="user-span">{this.props.currentUser.username}!</span></span>
            );
            logOutButton = (
                <button className ="log-out" onClick={() => this.logOut()}>Log out</button>
            );
        }
        return (
            <div className="header-bar">
                <ul className="header-bar-ul">
                    <li className ="header-bar-user">
                        {currentUser}
                    </li>
                    <li className ="header-bar-button">
                        {logOutButton}
                    </li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(HeaderBar);
