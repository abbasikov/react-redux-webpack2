import React from 'react';
import Feed from '../../components/Feed/Feed';
import { browserHistory } from 'react-router';
import routes from '../../routes';
import { connect } from 'react-redux';
import FeedLoader from '../../components/FeedLoader/FeedLoader';

class FeedContainer extends React.Component {

    static propTypes = {
        feeds:React.PropTypes.array
    };

    constructor(props) {
        super(props);
    }

    getFeeds() {
        var allFeeds = [];
        if(this.props.feeds) {
            allFeeds = this.props.feeds.map(function(feed) {
                return <Feed key={feed.userName}
                             userName={feed.userName}
                             content={feed.content}
                             boardName={feed.boardName} />;
            });
        }

        return allFeeds;
    }

    render() {
        return (
            <div className="content-wrapper">
                <div className="panel panel-flat ">
                    <div className="panel-body panel-post">
                        <button type="button" className="btn bg-orange-600 btn-xs"
                                onClick={(e) => browserHistory.push(routes.home.childRoutes.createPost.path)}>
                            <i className="glyphicon glyphicon-plus position-left"></i>
                            <span>POST</span>
                        </button>
                    </div>
                </div>

                {this.props.feeds.length == 0 ? <FeedLoader /> : this.getFeeds() }


            </div>
        );
    }
}

function mapStateToProps(state) {
    //Whatever is returned from this function will end up
    // as props inside of this container component
    return {
        feeds:state.feeds
    }
}

//function mapDispatchToProps(dispatch) {
//    return bindActionCreators({logoutUser,setHomeScreenLoading}, dispatch);
//}

export default connect(mapStateToProps, null)(FeedContainer);