import React from 'react';
import { browserHistory } from 'react-router';
import routes from '../../routes';

export default class CreatePostContainer extends React.Component {

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
                                this is create post container
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}