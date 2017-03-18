import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SideBarContainer extends React.Component {

    constructor(props){
        super(props);
    }


    componentWillReceiveProps(nextProps){

    }


    render() {

        return (
            <div className="sidebar sidebar-opposite sidebar-default sidebar-separate">
                <div className="sidebar-content">

                    <div className="sidebar-category">
                        <div className="category-content">
                            <form action="#">
                                <div className="has-feedback has-feedback-left">
                                    <input type="search" className="form-control" placeholder="Search"/>
                                    <div className="form-control-feedback">
                                        <i className="icon-search4 text-size-base text-muted"></i>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    //Whatever is returned from this function will end up
    // as props inside of this container component
    return {

    }
}

function mapDispatchToProps(dispatch) {
    //return bindActionCreators({setAuthState}, dispatch);
}


export default connect(mapStateToProps, null)(SideBarContainer);