import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { setAuthState, getFeeds } from '../../actions/actions';
import routes from '../../routes';
import utilityMethods from '../../utils/utilityMethods';
import { LOADING_TEXT } from '../../constants/MessageConstants';

import HeaderContainer from './../HeaderContainer/HeaderContainer';
import MainContentContainer from './../MainContentContainer/MainContentContainer';

import OverlayLoading from '../../components/OverlayLoading/OverlayLoading';

import '../../../less/app.less';

class HomeContainer extends React.Component {
    static propTypes = {
        homeScreenLoading:React.PropTypes.bool
    };

    constructor(props){
        super(props);
        this.state = {
            homeScreenLoading:false
        };
    }

    componentWillMount() {
        $(document.body).removeClass('navbar-bottom login-container').addClass('navbar-bottom navbar-top cbp-spmenu-push');
        var currentUser = utilityMethods.getUserSession();
        if(currentUser) {
            console.log('current user exists');
            this.props.setAuthState(true,JSON.parse(currentUser), '');
            this.props.getFeeds();
        }else {
            console.log('current user does not exists');
            browserHistory.push('/')
        }
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.loggedIn) {
            browserHistory.push(routes.login.path);
        }

        this.setState({
            homeScreenLoading: nextProps.homeScreenLoading ? nextProps.homeScreenLoading : false
        });
    }

    componentDidMount () {
        window.scrollTo(0, 0);
    }

    render() {

        return (

                <div className="home-wrapper">

                    <HeaderContainer />

                    {this.props.children}

                    <OverlayLoading loadingText={LOADING_TEXT} showLoading={this.props.homeScreenLoading}/>

                </div>


        );
    }
}

function mapStateToProps(state) {
    //Whatever is returned from this function will end up
    // as props inside of this container component
    return {
        loggedIn:state.loggedIn,
        currentUser:state.currentUser,
        loginError:state.loginError,
        homeScreenLoading:state.homeScreenLoading
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({setAuthState,getFeeds}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);