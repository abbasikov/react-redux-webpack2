import React from 'react';
import $ from 'jquery';

export default class ClickOutsideMixin extends React.Component {

    constructor(props) {
        super(props);
        this._clickDocument = this._clickDocument.bind(this);
    }

    componentDidMount() {
        $(document).bind('click', this._clickDocument);
    }

    componentWillUnmount () {
        $(document).unbind('click', this._clickDocument);
    }

    _clickDocument(e) {
        var component = this.refs.component;
        if (e.target == component || $(component).has(e.target).length) {
            this.clickedInside(e);
        } else {
            this.clickedOutside(e);
        }
    }
}