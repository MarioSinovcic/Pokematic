import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import rootReducers from '../reducers';
import ProfileCard from '../pages/profile-components/ProfileCard';
import TeamSidebar from '../pages/profile-components/TeamSidebar';


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

        it('TeamSidebar matches snapshot' , () => {
            const dummyTeamsList = [];

            const sidebar = renderer.create(<Provider store={store}>
                <TeamSidebar 
                teamsList={dummyTeamsList}/>
            </Provider>).toJSON();
            expect(sidebar).toMatchSnapshot();
        });

    })

});