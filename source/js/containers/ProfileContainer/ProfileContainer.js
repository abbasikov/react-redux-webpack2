import React from 'react';
import { browserHistory } from 'react-router';
import routes from '../../routes';

export default class ProfileContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-container profile-container">
                <div className="page-content">
                    <div className="content-wrapper">
                        <div className="profile-cover">
                            <div className="profile-cover-img"></div>
                            <div className="media">

                                    <div className="media-body">
                                        <a href="#" className="profile-thumb">
                                            <img src="../../assets/images/ron-carucci_avatar.jpg" className="img-circle" alt=""/>
                                        </a>
                                        <h1>Randy Shelton
                                            <small className="display-block">Assistant Professor</small>
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}