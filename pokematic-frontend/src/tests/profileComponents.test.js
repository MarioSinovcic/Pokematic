import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import rootReducers from '../reducers';
import ProfileCard from '../pages/profile-components/ProfileCard';



describe('profile components', () => {

    let store;
    beforeEach(() => {
        store = createStore(rootReducers)
    })


    describe('snapshot matching', () => {

        it('Profile Card matches snapshot' , () => {
            const profileCard = renderer.create(<Provider store={store}>
                <ProfileCard />
            </Provider>).toJSON();
            expect(profileCard).toMatchSnapshot();
        });

    })


    




});