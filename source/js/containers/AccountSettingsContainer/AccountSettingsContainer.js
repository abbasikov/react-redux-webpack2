import React from 'react';
import { browserHistory } from 'react-router';
import routes from '../../routes';

export default class AccountContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-container">
                <div className="page-content">
                    <div className="content-wrapper">
                        <div className="panel panel-flat ">
                            <div className="panel-body panel-post">
                                this is account settings container
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}