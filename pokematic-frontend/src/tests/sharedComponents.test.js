import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import rootReducers from '../reducers';
import TeamCard from '../pages/shared-components/TeamCard';
import Header from '../pages/shared-components/Header';
import ModalButton from '../pages/shared-components/ModalButton';
import ProgressBar from '../pages/shared-components/ProgressBar';
import TeamDetails from '../pages/shared-components/TeamDetails';
import Label from '../pages/shared-components/Label';
import ErrorMessage from '../pages/shared-components/ErrorMessage';


describe('shared components', () => {

    let store;
    beforeEach(() => {
        store = createStore(rootReducers)
    })


    describe('snapshot matching', () => {

        it('Team Card matches snapshot' , () => {
            const teamCard = renderer.create(<Provider store={store}>
                <TeamCard />
            </Provider>).toJSON();
            expect(teamCard).toMatchSnapshot();
        });

        // TODO: figure out how to use snapshot for router
        xit('Header matches snapshot' , () => {
            const header = renderer.create(<Provider store={store}>
                <Header />
            </Provider>).toJSON();
            expect(header).toMatchSnapshot();
        });

        it('Modal Button matches snapshot' , () => {
            const modalButton = renderer.create(<Provider store={store}>
                <ModalButton />
            </Provider>).toJSON();
            expect(modalButton).toMatchSnapshot();
        });

        it('Progress Bar matches snapshot' , () => {
            const progressBar = renderer.create(<Provider store={store}>
                <ProgressBar />
            </Provider>).toJSON();
            expect(progressBar).toMatchSnapshot();
        });

        it('Team Details matches snapshot' , () => {
            const details = renderer.create(<Provider store={store}>
                <TeamDetails />
            </Provider>).toJSON();
            expect(details).toMatchSnapshot();
        });

        it('Label matches snapshot' , () => {
            const label = renderer.create(<Provider store={store}>
                <Label />
            </Provider>).toJSON();
            expect(label).toMatchSnapshot();
        });

        xit('Error Message matches snapshot' , () => {
            const msg = renderer.create(<Provider store={store}>
                <ErrorMessage  message="hello"/>
            </Provider>).toJSON();
            expect(msg).toMatchSnapshot();
        });

    })


    




});