import React from 'react';

export default class Feed extends React.Component {

    render() {
        return (
            <div className="panel panel-flat border-top-warning">
                <div className="panel-heading">
                    <h5 className="panel-title feed-owner">{this.props.userName}
                        <span className="label border-warning-500 text-warning-500">Author</span>
                    </h5>
                    <div className="heading-elements selected-course">
                        <span className="label border-left-warning-500 label-striped color-warning-500">
                            {this.props.boardName}
                        </span>
                    </div>
                </div>
                <div className="panel-body">
                    <h6 className="text-semibold">Start your development with no hassle!</h6>

                    <p className="content-group">{this.props.content}</p>
                </div>
            </div>
        );
    }
}

