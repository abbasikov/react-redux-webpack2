import React from 'react';
import CreatePostContainer from './CreatePostContainer';
import renderer from 'react-test-renderer';

describe('CreatePostContainer', function() {
    it('#render', function() {
        const component = renderer.create(
            <CreatePostContainer />
        );
        var tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});