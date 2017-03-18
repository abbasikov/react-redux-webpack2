import React from 'react';
import {shallow, render} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import FeedContainer from './FeedContainer';
import toJson from 'enzyme-to-json';
import { INITIAL_STATE } from '../../constants/AppConstants';
import sinon from 'sinon';

const mockStore = configureMockStore([ thunk ]);

describe('FeedContainer', function() {
    var store;
    var container;

    beforeEach(function() {
        store = mockStore(INITIAL_STATE);
        container = render(<Provider store={store}>
                                <FeedContainer />
                            </Provider>);
    });

    describe('#renders', () => {

        it('with initial state, when feeds are empty', function() {
            expect(toJson(container)).toMatchSnapshot();
        });
    });
});