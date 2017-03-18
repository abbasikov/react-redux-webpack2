import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/actions';
import { bindActionCreators } from 'redux';
import $ from '../../../assets/js/core/libraries/jquery.min.js';
import { browserHistory } from 'react-router';

import '../../../less/login.less';
import routes from '../../routes';

class LoginContainer extends React.Component {

    static propTypes = {
        currentUser:React.PropTypes.object,
        sendingLoginRequest:React.PropTypes.bool,
        loggedIn:React.PropTypes.bool,
        loginError:React.PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            usernameError:false,
            passwordError:false,
            loginError:'',
            isLoading:false
        }
    }

    onUserNameChange(e) {
        this.setState({
            username:e.target.value
        });
    }

    onUserPasswordChange(e) {
        this.setState({
            password:e.target.value
        });
    }

    onBlurUserPassword(e) {
        this.setState({
            passwordError:e.target.value == '' ? true:false
        });

    }

    onBlurUserName(e) {
        this.setState({
            usernameError:e.target.value == '' ? true:false
        });
    }

    componentWillMount() {
        $(document.body).removeClass('layout-boxed navbar-bottom navbar-top').addClass('navbar-bottom login-container');
    }

    componentWillUnmount() {
        console.log('[LoginContainer] component un-mounted');
    }

    onLoginClick(e) {
        e.preventDefault();
        if(this.state.username != '' && this.state.password != '') {

            this.setState({
                isLoading:true,
                usernameError:false,
                passwordError:false,
                loginError:''
            });
            this.props.loginUser(this.state.username, this.state.password);
        }else{
            this.setState({
                usernameError:this.state.username == '',
                passwordError:this.state.password == '',
                loginError:''
            });
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            isLoading:nextProps.sendingLoginRequest,
            loginError:nextProps.loginError
        });
        if(nextProps.loggedIn) {
            browserHistory.push(routes.home.childRoutes.main.path)
        }
    }


    render() {
        return (
            <div className="login-wrapper">
                <div className="navbar navbar-inverse">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="index.html">
                            <div>ABC</div>
                        </a>
                    </div>
                </div>
                {/* Page container */}
                <div className="page-container">

                    {/* Page content */}
                    <div className="page-content">

                        {/* Main content */}
                        <div className="content-wrapper">

                            {/* Simple login form */}
                            <form onSubmit={(e)=>this.onLoginClick(e)}>
                                <div className="panel panel-body login-form">
                                    <div className="text-center">
                                        <div className="icon-object">
                                            <img src="../../assets/images/csu_fullerton_logo.png" style={{width:'120px', height:'120px'}} />
                                        </div>
                                        <h5 className="content-group">
                                            <small className="display-block">Enter your credentials below</small>
                                        </h5>
                                        <div className="invalid-cred" style={(this.state.loginError == '') ? {display:'none'}:{display:'block'}}>
                                            {this.state.loginError}
                                        </div>
                                    </div>

                                    <div className={`form-group has-feedback has-feedback-left ${this.state.usernameError ? 'animated shake': ''}`}>
                                        <input type="text"
                                               className={`form-control ${this.state.usernameError ? 'has-danger': ''}`}
                                               placeholder="Username"
                                               onChange={(e)=>this.onUserNameChange(e)}
                                               onBlur={(e)=>this.onBlurUserName(e)}
                                               value={this.state.username}/>

                                        <div className="form-control-feedback">
                                            <i className="icon-user text-muted"></i>
                                        </div>
                                    </div>

                                    <div className={`form-group has-feedback has-feedback-left ${this.state.passwordError ? 'animated shake': ''}`}>
                                        <input type="password"
                                               className={`form-control ${this.state.passwordError ? 'has-danger': ''}`}
                                               placeholder="Password"
                                               onChange={(e)=>this.onUserPasswordChange(e)}
                                               onBlur={(e)=>this.onBlurUserPassword(e)}
                                               value={this.state.password}/>

                                        <div className="form-control-feedback">
                                            <i className="icon-lock2 text-muted"></i>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="btn bg-slate btn-block"
                                                onClick={(e) => this.onLoginClick(e)}>

                                            <div style={{display:this.state.isLoading?'none':'block'}}>
                                                Sign in <i
                                                className="icon-circle-right2 position-right"></i>
                                            </div>

                                            <div style={{display:this.state.isLoading?'block':'none'}}>
                                                <i className="icon-spinner2 spinner"></i>
                                            </div>



                                        </button>
                                    </div>

                                    <div className="text-center">
                                        <a href="login_password_recover.html">Forgot password?</a>
                                    </div>
                                </div>
                            </form>
                            {/* /simple login form */}

                        </div>
                        {/* /main content */}

                    </div>
                    {/* /page content */}

                </div>
                {/* /page container */}

            </div>
        );
    }
}

function mapStateToProps(state) {
    //Whatever is returned from this function will end up
    // as props inside of this container component
    return {
        currentUser:state.currentUser,
        sendingLoginRequest:state.sendingLoginRequest,
        loggedIn:state.loggedIn,
        loginError:state.loginError
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({loginUser:loginUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);