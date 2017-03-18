import React from 'react';
import AccountSettingsContainer from './AccountSettingsContainer';
import renderer from 'react-test-renderer';

describe('AccountSettingsContainer', function() {
    it('#render', function() {
        const component = renderer.create(
            <AccountSettingsContainer />
        );
        var tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    });
});