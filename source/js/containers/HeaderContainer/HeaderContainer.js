import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { logoutUser,setHomeScreenLoading } from '../../actions/actions';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import routes from '../../routes';

import ClickOutsideMixin from '../../components/ClickOutsideMixin/ClickOutsideMixin';
import VerticalSlideMenu from '../../components/VerticalSlideMenu/VerticalSlideMenu';

class HeaderContainer extends ClickOutsideMixin {

    static propTypes = {
        currentUser:React.PropTypes.object,
        loggedIn:React.PropTypes.bool
    };


    constructor(props) {
        super(props);
        this.state = {
            courseSwitchOpen: false,
            userSwitchOpen: false,
            mobileSwitchOpen: false,
            messagesSwitchOpen:false
        }
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentWillUnmount () {
        super.componentWillUnmount();
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps){
    }

    toggleDropdown(name) {
        if(name === 'course-switch') {
            this.setState({
                courseSwitchOpen: !this.state.courseSwitchOpen,
                userSwitchOpen:false,
                messagesSwitchOpen:false
            });
        }
        if(name === 'user-switch') {
            this.setState({
                courseSwitchOpen: false,
                userSwitchOpen:!this.state.userSwitchOpen,
                messagesSwitchOpen:false
            });
        }

        if(name === 'mobile-switch') {
            this.setState({
                mobileSwitchOpen:!this.state.mobileSwitchOpen
            });
        }

        if(name === 'messages-switch') {
            this.setState({
                messagesSwitchOpen:!this.state.messagesSwitchOpen,
                userSwitchOpen:false,
                courseSwitchOpen: false
            });
        }
    }

    clickedInside() {
        //console.log('inside');
    }

    clickedOutside() {
        this.setState({
            courseSwitchOpen: false,
            userSwitchOpen:false,
            messagesSwitchOpen:false
        });
    }

    logoutClick(e) {
        e.preventDefault();
        this.closeSlideMenu();
        this.props.logoutUser();
    }

    clickHome(e) {
        e.preventDefault();
        this.closeSlideMenu();
        browserHistory.push(routes.home.childRoutes.main.path);
    }

    clickMyProfile(e){
        e.preventDefault();
        this.closeSlideMenu();
        browserHistory.push(routes.home.childRoutes.profile.path);
    }

    clickAccountSettings(e) {
        e.preventDefault();
        this.closeSlideMenu();
        browserHistory.push(routes.home.childRoutes.accountSettings.path);
    }

    closeSlideMenu() {
        this.setState({
            mobileSwitchOpen:false
        });
    }

    render() {
        return (
            <div className="navbar navbar-inverse navbar-fixed-top">
                <div className="navbar-boxed">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#"onClick={(e) => {
                                        e.preventDefault();
                                        browserHistory.push(routes.home.childRoutes.main.path);
                                    }}>
                            <div>ABC</div>
                        </a>

                        <ul className="nav navbar-nav visible-xs-block">
                            <li>
                                <a className="sidebar-mobile-main-toggle">
                                    <i className="icon-search4"></i>
                                </a>
                            </li>
                            <li>
                                <a className="sidebar-mobile-main-toggle" onClick={()=>this.toggleDropdown('mobile-switch')}>
                                    <i className="icon-paragraph-justify3"></i>
                                </a>
                            </li>

                        </ul>

                        <VerticalSlideMenu openMenu={this.state.mobileSwitchOpen}>
                            <a href="#" onClick={(e) => this.clickHome(e)}><i className="icon-home2"></i><span>Home</span></a>
                            <a href="#" onClick={(e) => this.clickMyProfile(e)}><i className="icon-user-plus"></i><span>My Profile</span></a>
                            <a href="#" onClick={(e) => this.clickAccountSettings(e)}><i className="icon-cog5"></i><span>Account settings</span></a>
                            <a href="#" onClick={(e) => this.logoutClick(e)}><i className="icon-switch2"></i><span>Logout</span></a>
                        </VerticalSlideMenu>

                    </div>

                    <div className="navbar-collapse collapse" id="navbar-mobile" ref="component">
                        <ul className="nav navbar-nav navbar-right">
                            <li className={this.state.courseSwitchOpen ? "dropdown language-switch open":"dropdown language-switch"}
                                onClick={() => this.toggleDropdown('course-switch')}>
                                <a className="dropdown-toggle">

                                    <span>Strategic Marketing</span>
                                    <span className="caret"></span>
                                </a>

                                <ul className="dropdown-menu">
                                    <li>
                                        <a>Cognitive Science</a>
                                    </li>
                                    <li className="divider"></li>
                                    <li>
                                        <a>Computer Programming</a>
                                    </li>
                                </ul>
                            </li>


                            <li className={this.state.messagesSwitchOpen ? "dropdown open":"dropdown" }
                                onClick={() => this.toggleDropdown('messages-switch')}>
                                <a href="#" className="dropdown-toggle" aria-expanded={this.state.messagesSwitchOpen ? "true":"false" }>
                                    <i className="icon-bubbles4"></i>
                                    <span className="visible-xs-inline-block position-right">Messages</span>
                                    <span className="badge bg-warning-400">2</span>
                                </a>

                                <div className="dropdown-menu dropdown-content width-350">
                                    <div className="dropdown-content-heading">
                                        Messages
                                        <ul className="icons-list">
                                            <li><a href="#"><i className="icon-compose"></i></a></li>
                                        </ul>
                                    </div>

                                    <ul className="media-list dropdown-content-body">
                                        <li className="media">
                                            <div className="media-left">
                                                <img src="../assets/images/placeholder.jpg" className="img-circle img-sm" alt=""/>
                                                    <span className="badge bg-danger-400 media-badge">5</span>
                                                </div>

                                                <div className="media-body">
                                                    <a href="#" className="media-heading">
                                                        <span className="text-semibold">James Alexander</span>
                                                        <span className="media-annotation pull-right">04:58</span>
                                                    </a>

                                                    <span className="text-muted">who knows, maybe that would be the best thing for me...</span>
                                                </div>
                                            </li>

                                            <li className="media">
                                                <div className="media-left">
                                                    <img src="../assets/images/placeholder.jpg" className="img-circle img-sm" alt=""/>
                                                        <span className="badge bg-danger-400 media-badge">4</span>
                                                    </div>

                                                    <div className="media-body">
                                                        <a href="#" className="media-heading">
                                                            <span className="text-semibold">Margo Baker</span>
                                                            <span className="media-annotation pull-right">12:16</span>
                                                        </a>

                                                        <span className="text-muted">That was something he was unable to do because...</span>
                                                    </div>
                                                </li>

                                                <li className="media">
                                                    <div className="media-left">
                                                        <img src="../assets/images/placeholder.jpg" className="img-circle img-sm" alt=""/>
                                                    </div>

                                                        <div className="media-body">
                                                            <a href="#" className="media-heading">
                                                                <span className="text-semibold">Jeremy Victorino</span>
                                                                <span className="media-annotation pull-right">22:48</span>
                                                            </a>

                                                            <span className="text-muted">But that would be extremely strained and suspicious...</span>
                                                        </div>
                                                    </li>

                                                    <li className="media">
                                                        <div className="media-left">
                                                            <img src="../assets/images/placeholder.jpg" className="img-circle img-sm" alt=""/>
                                                        </div>

                                                            <div className="media-body">
                                                                <a href="#" className="media-heading">
                                                                    <span className="text-semibold">Beatrix Diaz</span>
                                                                    <span className="media-annotation pull-right">Tue</span>
                                                                </a>

                                                                <span className="text-muted">What a strenuous career it is that I've chosen...</span>
                                                            </div>
                                                        </li>

                                                        <li className="media">
                                                            <div className="media-left">
                                                                <img src="../assets/images/placeholder.jpg" className="img-circle img-sm" alt=""/>
                                                            </div>

                                                                <div className="media-body">
                                                                    <a href="#" className="media-heading">
                                                                        <span className="text-semibold">Richard Vango</span>
                                                                        <span
                                                                            className="media-annotation pull-right">Mon</span>
                                                                    </a>

                                                                    <span className="text-muted">Other travelling salesmen live a life of luxury...</span>
                                                                </div>
                                                            </li>
                                                        </ul>

                                                        <div className="dropdown-content-footer">
                                                            <a href="#" data-popup="tooltip" title=""
                                                               data-original-title="All messages"><i
                                                                className="icon-menu display-block"></i></a>
                                                        </div>
                                                    </div>
                                                </li>



                            <li className={this.state.userSwitchOpen ? "dropdown dropdown-user open":"dropdown dropdown-user"}
                                onClick={() => this.toggleDropdown('user-switch')}>
                                <a className="dropdown-toggle" data-toggle="dropdown">
                                    <img src="../assets/images/ron-carucci_avatar.jpg" alt=""/>
                                    <span>{this.props.currentUser.firstName}</span>
                                    <i className="caret"></i>
                                </a>

                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li>
                                        <a href="#" onClick={(e) => this.clickHome(e)}>
                                            <i className="icon-home2"></i>Home
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" onClick={(e) => this.clickMyProfile(e)}>
                                            <i className="icon-user-plus"></i> My profile
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" onClick={(e) => this.clickAccountSettings(e)}>
                                            <i className="icon-cog5"></i> Account settings
                                        </a>
                                    </li>
                                    <li className="divider"></li>
                                    <li>
                                        <a href="#" onClick={(e) => this.logoutClick(e)}>
                                            <i className="icon-switch2"></i> Logout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    //Whatever is returned from this function will end up
    // as props inside of this container component
    return {
        currentUser:state.currentUser,
        loggedIn:state.loggedIn
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({logoutUser,setHomeScreenLoading}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);