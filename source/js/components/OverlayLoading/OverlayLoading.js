import React from 'react';

export default class OverlayLoading extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.loadingText) {
            var msg = 'OverlayLoading Requires Loading Text as Props';
            console.error(msg);
            return (
                <div>{msg}</div>
            );
        }

        return (
            <div>
                <div className={this.props.showLoading ? "overlay" : "overlay hide"}></div>
                <div className={this.props.showLoading ? "overlay-loading" : "overlay-loading hide"}>
                    <button type="button" className="btn btn-default" id="spinner-light-2">
                        <i className="icon-spinner2 spinner position-left"></i>{this.props.loadingText}
                    </button>
                </div>
            </div>
        );
    }
}

