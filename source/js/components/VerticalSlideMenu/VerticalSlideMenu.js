import React from 'react';

export default class VerticalSlideMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openMenu:props.openMenu
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            openMenu:nextProps.openMenu
        });
    }

    render() {
        return (
            <nav className={this.state.openMenu ? "cbp-spmenu cbp-spmenu-vertical cbp-spmenu-right cbp-spmenu-open" : "cbp-spmenu cbp-spmenu-vertical cbp-spmenu-right"}>
                {this.props.children}
            </nav>
        );
    }
}

