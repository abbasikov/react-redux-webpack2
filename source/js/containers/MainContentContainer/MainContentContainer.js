import React from 'react';
import FeedContainer from './../FeedContainer/FeedContainer';
import SideBarContainer from './../SideBarContainer/SideBarContainer';
import { connect } from 'react-redux';

class MainContentContainer extends React.Component {

    static propTypes = {
        homeScreenLoading:React.PropTypes.bool
    };

    render() {
        return (
            <div className={this.props.homeScreenLoading ? "page-container blur-background" : "page-container"}>
                {/*Page content */}
                <div className="page-content">
                    {/*Main content */}
                    <FeedContainer />
                    {/*/main content */}

                    <SideBarContainer />

                </div>
                {/*/page content */}
            </div>
        );
    }
}

function mapStateToProps(state) {
    //Whatever is returned from this function will end up
    // as props inside of this container component
    return {
        homeScreenLoading:state.homeScreenLoading
    }
}

export default connect(mapStateToProps, null)(MainContentContainer);